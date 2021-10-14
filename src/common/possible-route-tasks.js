function parseStartEndNodes(nodeArray, sNode, eNode)
{
	var startMatchFlag = nodeArray.indexOf(sNode);
	var endMatchFlag = nodeArray.indexOf(eNode);
	var parseRes = {start: null, end: null};
	
	if (startMatchFlag >= 0 && startMatchFlag < nodeArray.length)
	{
		parseRes.start = startMatchFlag;
	}
	
	if (endMatchFlag >= 0 && endMatchFlag < nodeArray.length)
	{
		parseRes.end = endMatchFlag;
	}
	
	return parseRes;
}


function validateStartEndNodes(parseObj)
{
	var validationResult = (parseObj.start !== null && parseObj.end !== null);
	return validationResult;
}


function initializeRouteBacklog(sNode)
{
	var startRoute = {};
	var intlRes = [];
	
	startRoute["steps"] = [sNode];
	startRoute["distance"] = 0;
	
	intlRes = [startRoute];
	return intlRes;
}


function saveCompletedRoute(routeInd, routeObj, routeArr, compArr, routeValid)
{
	var routeAlreadyExists = checkRouteExists(routeObj.steps, compArr);
	var completeDefinition = {route: null, valid: null};
	var saveSuccessful = false;
	
	if (routeAlreadyExists !== true)
	{
		completeDefinition.route = routeObj;
		completeDefinition.valid = routeValid;
		compArr.push(completeDefinition);
		saveSuccessful = true;
	}
	
	return saveSuccessful;
}


function deriveNewRoutes(baseRouteInd, baseRouteObj, possibleEdges, edgeArray, routeArr)
{
	var adjacentIndex = 0;
	var currentEdgeID = -1;
	var currentEdgeObject = {};
	var currentNewRoute = {};
	var currentInsertIndex = -1;
	
	for (adjacentIndex = 0; adjacentIndex < possibleEdges.length; adjacentIndex = adjacentIndex + 1)
	{
		currentEdgeID = possibleEdges[adjacentIndex];
		currentEdgeObject = edgeArray[currentEdgeID];
		currentNewRoute = cloneRouteObject(baseRouteObj);
		currentInsertIndex = (baseRouteInd + adjacentIndex) + 1;
		
		currentNewRoute.steps.push(currentEdgeObject.destination);
		currentNewRoute.distance += currentEdgeObject.distance;
		routeArr.splice(currentInsertIndex, 0, currentNewRoute);
	}
}


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


function checkRouteExists(newRouteSteps, existingRoutes)
{
	var routeKey = newRouteSteps.join();
	
	var entryIndex = 0;
	var currentEntry = {};
	var currentKey = "";
	var matchFound = false;
	
	while (entryIndex >= 0 && entryIndex < existingRoutes.length && matchFound !== true)
	{
		currentEntry = existingRoutes[entryIndex];
		currentKey = currentEntry.route.steps.join();
		
		if (currentKey === routeKey)
		{
			matchFound = true;
		}
		
		entryIndex = entryIndex + 1;
	}
	
	return matchFound;
}


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