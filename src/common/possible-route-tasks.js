// Secondary functions for 'all possible routes' pathfinding.


const criteriaTypes = require("./enum/criteria-types");
const numSigns = require("./enum/num-signs");


// Prepare route criteria for pathfinding.
function inspectRouteCriteria(givenNodesList, givenCriteriaArray, skipLoop)
{
	var targetRes = {};
	
	targetRes["startNodes"] = [];
	targetRes["endNodes"] = [];
	targetRes["cutoffSet"] = false;
	targetRes["backtrack"] = true;
	targetRes["templatePointers"] = [];
	
	if (!skipLoop)
	{
		loopCriteriaInspection(givenNodesList, givenCriteriaArray, targetRes);
	}
	
	return targetRes;
}


// Initialize route backlog with only one node.
function initializeSingleRouteBacklog(startNodeIndex)
{
	var startRoute = defineRouteObject(startNodeIndex);
	return [startRoute];
}

// Initialize route backlog with multiple nodes.
function initializeMultipleRoutesBacklog(markedNodes)
{
	var intlRes = [];
	
	for (var markIndex = 0; markIndex < markedNodes.length; markIndex++)
	{
		var currentStart = markedNodes[markIndex];
		var currentRoute = defineRouteObject(currentStart);
		intlRes.push(currentRoute);
	}
	
	return intlRes;
}




// Check whether to save a complete route after it has been validated.
function saveCompletedRoute(routeInd, routeObj, routeArr, compArr, routeValid)
{
	var routeAlreadyExists = checkRouteExists(routeObj.steps, compArr);
	var saveSuccessful = false;
	
	if (!routeAlreadyExists)
	{
		var completeDefinition = {route: routeObj, valid: routeValid};
		compArr.push(completeDefinition);
		saveSuccessful = true;
	}
	
	return saveSuccessful;
}


// Derive new routes using possible destinations.
function deriveNewRoutes(baseRouteInd, baseRouteObj, possibleEdges, edgeArray, routeEnds, routeArr, allowBack)
{	
	var offsetIndex = 1;
	
	// Loop marked edges that link to possible destinations.
	for (var adjacentIndex = 0; adjacentIndex < possibleEdges.length; adjacentIndex++)
	{
		// Read current edge.
		var currentEdgeID = possibleEdges[adjacentIndex];
		var currentEdgeObject = edgeArray[currentEdgeID];
		
		// Prepare new route.
		var currentNewRoute = cloneRouteObject(baseRouteObj);
		var currentInsertIndex = baseRouteInd + offsetIndex;
		var currentUpdate = checkDeriveAllowed(currentEdgeObject.destination, currentNewRoute, routeEnds, allowBack);
		
		if (currentUpdate)
		{
			// Update new route.
			currentNewRoute.steps.push(currentEdgeObject.destination);
			currentNewRoute.distance += currentEdgeObject.distance;
			
			// Add to backlog.
			routeArr.splice(currentInsertIndex, 0, currentNewRoute);
			
			offsetIndex += 1;
		}
	}
	
	return (offsetIndex - 1);
}


// Remove invalid routes from array.
function filterValidCompleteRoutes(compArr)
{
	var entryIndex = 0;
	
	while (entryIndex >= 0 && entryIndex < compArr.length)
	{
		var currentEntry = compArr[entryIndex];
		
		if (currentEntry.valid)
		{
			entryIndex = entryIndex + 1;
		}
		else
		{
			compArr.splice(entryIndex, 1);
		}
	}
}


// Performs criteria preperation loop.
function loopCriteriaInspection(nodesArray, criteriaArray, resultObj)
{
	var cutoffSigns = [];
	
	// These number signs enforce limits to stop count or total distance.
	cutoffSigns.push(numSigns.LESS, numSigns.LESS_EQUAL, numSigns.EQUAL);
	
	for (var criteriaIndex = 0; criteriaIndex < criteriaArray.length; criteriaIndex++)
	{
		// Read current criteria.
		var currentCriteria = criteriaArray[criteriaIndex];
		var currentType = currentCriteria.type;
		
		if (currentType === criteriaTypes.START_NODE)
		{
			// Mark start node.
			addNodeToTarget(currentCriteria.node, resultObj.startNodes);
		}
		else if (currentType === criteriaTypes.END_NODE)
		{
			// Mark end node.
			addNodeToTarget(currentCriteria.node, resultObj.endNodes);
		}
		else if (currentType === criteriaTypes.STOP_COUNT && !resultObj.cutoffSet)
		{
			// Set 'stop count' cutoff if applicable based on sign.
			resultObj.cutoffSet = cutoffSigns.includes(currentCriteria.sign);
		}
		else if (currentType === criteriaTypes.TOTAL_DISTANCE && !resultObj.cutoffSet)
		{
			// Set 'total distance' cutoff if applicable based on sign.
			resultObj.cutoffSet = cutoffSigns.includes(currentCriteria.sign);
		}
		else if (currentType === criteriaTypes.ONE_WAY)
		{
			// Prevent backtracking for one-way routes.
			resultObj.backtrack = false;
			resultObj.cutoffSet = true;
		}
		else if (currentType === criteriaTypes.TEMPLATE)
		{
			// Mark template criteria for parsing.
			resultObj.templatePointers.push(criteriaIndex);
		}
		
	}
}


// Marks node as start or end when inspecting criteria.
function addNodeToTarget(nodeInd, tgtArr)
{
	var alreadyUsed = tgtArr.indexOf(nodeInd);
	if (!alreadyUsed !== true) tgtArr.push(nodeInd);
}


// Define route object with start node.
function defineRouteObject(sNode)
{
	return {steps: [sNode], distance: 0};
}


// Checks if a given route has already been saved.
function checkRouteExists(newRouteSteps, existingRoutes)
{
	var routeKey = newRouteSteps.join();
	var entryIndex = 0;
	var matchFound = false;
	
	
	while (entryIndex >= 0 && entryIndex < existingRoutes.length && !matchFound)
	{
		// Read current route as unique key string.
		var currentEntry = existingRoutes[entryIndex];
		var currentKey = currentEntry.route.steps.join();
		
		
		matchFound = (currentKey === routeKey)
		entryIndex += 1;
	}
	
	return matchFound;
}


// Creates separate copy of route object.
function cloneRouteObject(origObj)
{
	var definitionText = JSON.stringify(origObj);
	return JSON.parse(definitionText);
}


// Checks whether continuing a route is allowed.
function checkDeriveAllowed(tgtNode, newRoute, eNodes, backtrackStatus)
{
	var startNode = newRoute.steps[0];
	var closedRoute = eNodes.includes(startNode);
	var visitStatus = newRoute.steps.includes(tgtNode);
	var endMatch = eNodes.includes(tgtNode);
	var endNodeFound = (endMatch || eNodes.length === 0);
	var checkRes = false;
	
	if (visitStatus && backtrackStatus)
	{
		// Backtracking is allowed.
		checkRes = true;
	}
	else if (visitStatus && closedRoute && endNodeFound)
	{
		// Re-visiting the start node is allowed for closed routes.
		checkRes = true;
	}
	else if (visitStatus)
	{
		// Backtracking is not allowed.
		checkRes = false;
	}
	else
	{
		// Valid node.
		checkRes = true;
	}
	
	return checkRes;
}



module.exports =
{
	inspectCriteria: inspectRouteCriteria,
	initializeSingleBacklog: initializeSingleRouteBacklog,
	initializeMultipleBacklog: initializeMultipleRoutesBacklog,
	saveComplete: saveCompletedRoute,
	deriveNew: deriveNewRoutes,
	filterValidRoutes: filterValidCompleteRoutes
};