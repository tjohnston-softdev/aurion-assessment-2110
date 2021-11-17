// Secondary functions for 'all possible routes' pathfinding.


const criteriaTypes = require("./enum/criteria-types");


function setRouteTargetNodes(givenNodesList, givenCriteriaArray, skipLoop)
{
	var targetRes = {};
	
	targetRes["start"] = [];
	targetRes["end"] = [];
	
	if (skipLoop !== true)
	{
		loopTargetCriteria(givenNodesList, givenCriteriaArray, targetRes);
	}
	
	return targetRes;
}


function initializeSingleRouteBacklog(startNodeIndex)
{
	var startRoute = defineRouteObject(startNodeIndex);
	var intlRes = [startRoute];
	return intlRes;
}

function initializeMultipleRoutesBacklog(markedNodes)
{
	var markIndex = 0;
	var currentStart = -1;
	var currentRoute = {};
	
	var intlRes = [];
	
	for (markIndex = 0; markIndex < markedNodes.length; markIndex = markIndex + 1)
	{
		currentStart = markedNodes[markIndex];
		currentRoute = defineRouteObject(currentStart);
		intlRes.push(currentRoute);
	}
	
	return intlRes;
}




// Check whether to save a complete route after it has been validated.
function saveCompletedRoute(routeInd, routeObj, routeArr, compArr, routeValid)
{
	var routeAlreadyExists = checkRouteExists(routeObj.steps, compArr);
	var completeDefinition = {route: null, valid: null};
	var saveSuccessful = false;
	
	if (routeAlreadyExists !== true)
	{
		// Save route since it does not exist yet.
		completeDefinition.route = routeObj;
		completeDefinition.valid = routeValid;
		compArr.push(completeDefinition);
		saveSuccessful = true;
	}
	
	return saveSuccessful;
}


// Derive new routes using possible destinations.
function deriveNewRoutes(baseRouteInd, baseRouteObj, possibleEdges, edgeArray, routeArr, allowBack)
{
	var adjacentIndex = 0;
	var currentEdgeID = -1;
	var currentEdgeObject = {};
	var currentNewRoute = {};
	var currentInsertIndex = -1;
	var currentVisited = false;
	var currentUpdate = false;
	
	var offsetIndex = 1;
	
	// Loop marked edges that link to possible destinations.
	for (adjacentIndex = 0; adjacentIndex < possibleEdges.length; adjacentIndex = adjacentIndex + 1)
	{
		// Read current edge.
		currentEdgeID = possibleEdges[adjacentIndex];
		currentEdgeObject = edgeArray[currentEdgeID];
		
		// Prepare new route.
		currentNewRoute = cloneRouteObject(baseRouteObj);
		currentInsertIndex = baseRouteInd + offsetIndex;
		currentVisited = currentNewRoute.steps.includes(currentEdgeObject.destination);
		currentUpdate = checkDeriveAllowed(currentVisited, allowBack);
		
		if (currentUpdate === true)
		{
			// Update new route.
			currentNewRoute.steps.push(currentEdgeObject.destination);
			currentNewRoute.distance += currentEdgeObject.distance;
			
			// Add to backlog.
			routeArr.splice(currentInsertIndex, 0, currentNewRoute);
			
			offsetIndex = offsetIndex + 1;
		}
	}
}

// Count number of valid complete routes.
function countValidCompletedRoutes(compArr)
{
	var entryIndex = 0;
	var currentEntry = {};
	var countRes = 0;
	
	for (entryIndex = 0; entryIndex < compArr.length; entryIndex = entryIndex + 1)
	{
		currentEntry = compArr[entryIndex];
		
		if (currentEntry.valid === true)
		{
			countRes += 1;
		}
	}
	
	return countRes;
}


function loopTargetCriteria(nodesArray, criteriaArray, resultObj)
{
	var criteriaIndex = 0;
	var currentCriteria = {};
	
	for (criteriaIndex = 0; criteriaIndex < criteriaArray.length; criteriaIndex = criteriaIndex + 1)
	{
		currentCriteria = criteriaArray[criteriaIndex];
		currentUsed = false;
		
		if (currentCriteria.type === criteriaTypes.START_NODE)
		{
			addNodeToTarget(currentCriteria.node, resultObj.start);
		}
		else if (currentCriteria.type === criteriaTypes.END_NODE)
		{
			addNodeToTarget(currentCriteria.node, resultObj.end);
		}
		
	}
}


function addNodeToTarget(nodeInd, tgtArr)
{
	var alreadyUsed = tgtArr.indexOf(nodeInd);
	
	if (alreadyUsed !== true)
	{
		tgtArr.push(nodeInd);
	}
}




function defineRouteObject(sNode)
{
	var defineRes = {};
	
	defineRes["steps"] = [sNode];
	defineRes["distance"] = 0;
	
	return defineRes;
}


// Checks if a given route has already been saved.
function checkRouteExists(newRouteSteps, existingRoutes)
{
	var routeKey = "";
	
	var entryIndex = 0;
	var currentEntry = {};
	var currentKey = "";
	var matchFound = false;
	
	// Convert current route to key string.
	routeKey = newRouteSteps.join();
	
	
	// Loop existing completed route entries.
	while (entryIndex >= 0 && entryIndex < existingRoutes.length && matchFound !== true)
	{
		// Read current route as unique key string.
		currentEntry = existingRoutes[entryIndex];
		currentKey = currentEntry.route.steps.join();
		
		
		if (currentKey === routeKey)
		{
			// Route already exists.
			matchFound = true;
		}
		
		entryIndex = entryIndex + 1;
	}
	
	return matchFound;
}


// Creates separate copy of route object.
function cloneRouteObject(origObj)
{
	var definitionText = JSON.stringify(origObj);
	var cloneRes = JSON.parse(definitionText);
	return cloneRes;
}


function checkDeriveAllowed(visitStatus, backtrackStatus)
{
	var checkRes = false;
	
	if (visitStatus === true && backtrackStatus === true)
	{
		checkRes = true;
	}
	else if (visitStatus === true)
	{
		checkRes = false;
	}
	else
	{
		checkRes = true;
	}
	
	return checkRes;
}



module.exports =
{
	setTargetNodes: setRouteTargetNodes,
	initializeSingleBacklog: initializeSingleRouteBacklog,
	initializeMultipleBacklog: initializeMultipleRoutesBacklog,
	saveComplete: saveCompletedRoute,
	deriveNew: deriveNewRoutes,
	countValidRoutes: countValidCompletedRoutes
};