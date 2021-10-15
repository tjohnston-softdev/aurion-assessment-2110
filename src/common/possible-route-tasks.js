// Secondary functions for 'all possible routes' pathfinding.


// Parse node input.
function parseStartEndNodes(nodeArray, sNode, eNode)
{
	var startMatchFlag = -1;
	var endMatchFlag = -1;
	var parseRes = {start: null, end: null};
	
	// Check if nodes exist.
	startMatchFlag = nodeArray.indexOf(sNode);
	endMatchFlag = nodeArray.indexOf(eNode);
	
	// Mark start node.
	if (startMatchFlag >= 0 && startMatchFlag < nodeArray.length)
	{
		parseRes.start = startMatchFlag;
	}
	
	// Mark end node.
	if (endMatchFlag >= 0 && endMatchFlag < nodeArray.length)
	{
		parseRes.end = endMatchFlag;
	}
	
	return parseRes;
}

// Validate parsed nodes.
function validateStartEndNodes(parseObj)
{
	// Both start and end must be set.
	var validationResult = (parseObj.start !== null && parseObj.end !== null);
	return validationResult;
}


// Initialize array of possible routes using start node.
function initializeRouteBacklog(sNode)
{
	var startRoute = {};
	var intlRes = [];
	
	startRoute["steps"] = [sNode];			// List of node steps.
	startRoute["distance"] = 0;				// Total distance.
	
	intlRes = [startRoute];
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
function deriveNewRoutes(baseRouteInd, baseRouteObj, possibleEdges, edgeArray, routeArr)
{
	var adjacentIndex = 0;
	var currentEdgeID = -1;
	var currentEdgeObject = {};
	var currentNewRoute = {};
	var currentInsertIndex = -1;
	
	// Loop marked edges that link to possible destinations.
	for (adjacentIndex = 0; adjacentIndex < possibleEdges.length; adjacentIndex = adjacentIndex + 1)
	{
		// Read current edge.
		currentEdgeID = possibleEdges[adjacentIndex];
		currentEdgeObject = edgeArray[currentEdgeID];
		
		// Prepare new route.
		currentNewRoute = cloneRouteObject(baseRouteObj);
		currentInsertIndex = (baseRouteInd + adjacentIndex) + 1;
		
		// Update new route.
		currentNewRoute.steps.push(currentEdgeObject.destination);
		currentNewRoute.distance += currentEdgeObject.distance;
		
		// Add to backlog.
		routeArr.splice(currentInsertIndex, 0, currentNewRoute);
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



module.exports =
{
	parseNodes: parseStartEndNodes,
	validateNodes: validateStartEndNodes,
	initializeBacklog: initializeRouteBacklog,
	saveComplete: saveCompletedRoute,
	deriveNew: deriveNewRoutes,
	countValidRoutes: countValidCompletedRoutes
};