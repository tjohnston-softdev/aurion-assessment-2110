const graphTasks = require("./common/graph-tasks");
const routeTasks = require("./common/possible-route-tasks");
const numSigns = require("./common/num-signs");
const routeCriteria = require("./common/route-criteria");


function findPossibleRoutes(graphObject, startNode, endNode, stopCountCriteria, distanceCriteria)
{
	var preparedNodes = routeTasks.parseNodes(graphObject.nodes, startNode, endNode);
	var nodesValid = routeTasks.validateNodes(preparedNodes);
	var countValid = routeCriteria.validateCriteria(stopCountCriteria);
	var distValid = routeCriteria.validateCriteria(distanceCriteria);
	var possibleRes = null;
	
	if (nodesValid === true && countValid === true && distValid === true)
	{
		possibleRes = performSearch(preparedNodes, graphObject, stopCountCriteria, distanceCriteria);
	}
	else if (nodesValid === true && countValid === true)
	{
		possibleRes = "INVALID DISTANCE CRITERIA";
	}
	else if (nodesValid === true)
	{
		possibleRes = "INVALID COUNT CRITERIA";
	}
	else
	{
		possibleRes = graphTasks.getUnknownNodesText();
	}
	
	return possibleRes;
}


function performSearch(prepNodes, graphObj, stopCountCritObject, distanceCritObject)
{
	var routeBacklog = routeTasks.initializeBacklog(prepNodes.start);
	var completedRoutes = [];
	
	while (routeBacklog.length > 0)
	{
		iterateRoutes(prepNodes, graphObj.edges, stopCountCritObject, distanceCritObject, routeBacklog, completedRoutes);
	}
	
	var searchRes = routeTasks.countValidRoutes(completedRoutes);
	return searchRes;
}


function iterateRoutes(pNodes, graphEdgeArr, stopCriteriaObj, distCriteriaObj, routeArray, compArray)
{
	var routeIndex = 0;
	var currentRoute = {};
	var currentStops = -1;
	var currentNode = -1;
	var currentSave = false;
	var currentBranchAllowed = false;
	var currentValid = false;
	var currentAdjEdges = [];
	var currentOffset = 0;
	
	while (routeIndex >= 0 && routeIndex < routeArray.length)
	{
		currentRoute = routeArray[routeIndex];
		currentStops = currentRoute.steps.length - 1;
		currentNode = currentRoute.steps[currentStops];
		currentSave = false;
		currentBranchAllowed = true;
		currentValid = false;
		currentAdjEdges = [];
		currentOffset = 0;
		
		if (currentNode === pNodes.end)
		{
			currentSave = validateCompletedRoute(currentRoute.distance, currentStops, stopCriteriaObj, distCriteriaObj);
			currentBranchAllowed = routeTasks.saveComplete(routeIndex, currentRoute, routeArray, compArray, currentSave);
		}
		
		
		if (currentBranchAllowed === true)
		{
			currentAdjEdges = readIncompleteRoute(currentNode, currentRoute.distance, currentStops, stopCriteriaObj, distCriteriaObj, graphEdgeArr);
			routeTasks.deriveNew(routeIndex, currentRoute, currentAdjEdges, graphEdgeArr, routeArray);
			currentOffset = currentAdjEdges.length;
		}
		
		
		routeArray.splice(routeIndex, 1);
		routeIndex = routeIndex + currentOffset;
	}
}


function validateCompletedRoute(distVal, stopCount, stopCriteria, distCriteria)
{
	var stopCountMatch = checkCompletedRouteCriteriaMatch(stopCount, stopCriteria);
	var distanceMatch = checkCompletedRouteCriteriaMatch(distVal, distCriteria);
	var validRes = false;
	
	if (stopCountMatch === true && distanceMatch === true && stopCount > 0)
	{
		validRes = true;
	}
	
	return validRes;
}


function readIncompleteRoute(baseNodeID, distVal, stopCount, stopCriteria, distCriteria, graphEdges)
{
	var stopCountValid = checkIncompleteRouteCriteriaMatch(stopCount, stopCriteria);
	var distanceValid = checkIncompleteRouteCriteriaMatch(distVal, distCriteria);
	var readRes = [];
	
	if (stopCountValid === true && distanceValid === true)
	{
		readRes = graphTasks.getAdjacentEdges(baseNodeID, graphEdges);
	}
	
	return readRes;
}



function checkCompletedRouteCriteriaMatch(actualValue, criteriaObj)
{
	var matchRes = false;
	
	if (criteriaObj === null)
	{
		matchRes = true;
	}
	else if (criteriaObj.sign === numSigns.LESS && actualValue < criteriaObj.number)
	{
		matchRes = true;
	}
	else if (criteriaObj.sign === numSigns.LESS_EQUAL && actualValue <= criteriaObj.number)
	{
		matchRes = true;
	}
	else if (criteriaObj.sign === numSigns.EQUAL && actualValue === criteriaObj.number)
	{
		matchRes = true;
	}
	else if (criteriaObj.sign === numSigns.GREAT && actualValue > criteriaObj.number)
	{
		matchRes = true;
	}
	else if (criteriaObj.sign === numSigns.GREAT_EQUAL && actualValue >= criteriaObj.number)
	{
		matchRes = true;
	}
	else
	{
		matchRes = false;
	}
	
	return matchRes;
}


function checkIncompleteRouteCriteriaMatch(actualValue, criteriaObj)
{
	var matchRes = false;
	
	if (criteriaObj === null)
	{
		matchRes = true;
	}
	else if (criteriaObj.sign === numSigns.LESS && actualValue >= criteriaObj.number)
	{
		matchRes = false;
	}
	else if (criteriaObj.sign === numSigns.LESS_EQUAL && actualValue > criteriaObj.number)
	{
		matchRes = false;
	}
	else if (criteriaObj.sign === numSigns.EQUAL && actualValue > criteriaObj.number)
	{
		matchRes = false;
	}
	else
	{
		matchRes = true;
	}
	
	return matchRes;
}



module.exports =
{
	findRoutes: findPossibleRoutes
};