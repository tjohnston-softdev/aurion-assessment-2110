// This script finds all possible routes between nodes based on criteria.

const graphTasks = require("./common/graph-tasks");
const routeTasks = require("./common/possible-route-tasks");
const numSigns = require("./common/enum/num-signs");
const routeCriteria = require("./common/route-criteria");
const possibleCriteriaValidation = require("./common/possible-criteria-validation");
const possibleCriteriaMessage = require("./common/possible-criteria-message");


// Main function.
function findPossibleRoutes(graphObject, criteriaListObject)
{
	var criteriaValidation = routeCriteria.validateCriteria(criteriaListObject);
	var searchPrepared = false;
	var criteriaInspection = {};
	var preparedStartNodes = [];
	var possibleRes = null;
	
	if (criteriaValidation.successful === true)
	{
		searchPrepared = true;
		criteriaInspection = routeTasks.inspectCriteria(graphObject.nodes, criteriaListObject, criteriaValidation.ignore);
	}
	
	if (searchPrepared === true && criteriaInspection.cutoffSet === true)
	{
		preparedStartNodes = performInitialSequence(criteriaInspection, graphObject, criteriaListObject, criteriaValidation.ignore);
		possibleRes = performMainSearch(criteriaInspection, graphObject, criteriaListObject, criteriaValidation.ignore, preparedStartNodes);
	}
	else if (searchPrepared === true)
	{
		possibleRes = Number.POSITIVE_INFINITY;
	}
	else
	{
		possibleRes = possibleCriteriaMessage.prepareText(criteriaValidation);
	}
	
	
	return possibleRes;
}


// Searches for a possible route in sequence.
function performInitialSequence(prepData, graphObj, criteriaListObj, ignoreCriteria)
{
	var maxIterations = Math.ceil(graphObj.nodes.length * 1.15);
	
	var nodeIndex = 0;
	var currentStart = false;
	var currentLoop = false;
	
	var currentIteration = 1;
	var currentBacklog = [];
	var currentExplored = [];
	var currentFound = false;
	
	var successfulNodes = [];
	
	for (nodeIndex = 0; nodeIndex < graphObj.nodes.length; nodeIndex = nodeIndex + 1)
	{
		currentStart = prepData.startNodes.includes(nodeIndex);
		currentLoop = (currentStart === true || prepData.startNodes.length <= 0);
		
		currentIteration = 1;
		currentBacklog = routeTasks.initializeSingleBacklog(nodeIndex);
		currentExplored = [];
		currentFound = false;
		
		while (currentIteration >= 1 && currentIteration <= maxIterations && currentFound !== true && currentLoop === true)
		{
			// Iterate through current set of routes.
			currentFound = iterateRoutes(prepData, graphObj.edges, criteriaListObj, ignoreCriteria, currentBacklog, currentExplored, false);
			currentIteration = currentIteration + 1;
		}
		
		if (currentFound === true)
		{
			successfulNodes.push(nodeIndex);
		}
		
	}
	
	return successfulNodes;
}


// Search for all possible routes.
function performMainSearch(prepData, graphObj, criteriaListObj, ignoreCriteria, startPoints)
{
	var routeBacklog = routeTasks.initializeMultipleBacklog(startPoints);
	var completedRoutes = [];
	
	// Loop until all possible routes have been explored.
	while (routeBacklog.length > 0)
	{
		// Iterate through current set of routes.
		iterateRoutes(prepData.endNodes, graphObj.edges, criteriaListObj, ignoreCriteria, routeBacklog, completedRoutes, true);
	}
	
	var searchRes = routeTasks.countValidRoutes(completedRoutes);
	return searchRes;
}


// Loop through current set of possible routes.
function iterateRoutes(endList, graphEdgeArr, critListArr, ignoreCrit, routeArray, compArray, allowBacktracking)
{
	var routeIndex = 0;
	var currentRoute = {};
	var currentStops = -1;
	var currentNode = -1;
	var currentEndPoint = false;
	var currentEndValid = false;
	var currentBranchAllowed = false;
	var currentAdjEdges = [];
	var currentOffset = 0;
	
	var endReached = false;
	
	while (routeIndex >= 0 && routeIndex < routeArray.length)
	{
		// Read current route with number of stops and previous node.
		currentRoute = routeArray[routeIndex];
		currentStops = currentRoute.steps.length - 1;
		currentNode = currentRoute.steps[currentStops];
		currentEndPoint = endList.includes(currentNode);
		
		// Reset result variables.
		currentEndValid = false;				// Completed route can be saved.
		currentBranchAllowed = true;			// Backlog route can be explored.
		currentAdjEdges = [];					// Edges adjacent to current node.
		currentOffset = 0;						// Loop index offset.
		
		
		// If end node has been reached, save it, and check whether it should be explored further.
		if (currentEndPoint === true || endList.length === 0)
		{
			currentEndValid = validateCompletedRoute(currentRoute.distance, currentStops, critListArr, ignoreCrit);
			currentBranchAllowed = routeTasks.saveComplete(routeIndex, currentRoute, routeArray, compArray, currentEndValid);
			endReached = true;
		}
		
		
		if (currentBranchAllowed === true)
		{
			// Derive new routes from possible destinations.
			currentAdjEdges = readIncompleteRoute(currentNode, currentRoute.distance, currentStops, critListArr, ignoreCrit, graphEdgeArr);
			routeTasks.deriveNew(routeIndex, currentRoute, currentAdjEdges, graphEdgeArr, routeArray, allowBacktracking);
			currentOffset = currentAdjEdges.length;
		}
		
		
		// Remove current route from backlog and update loop index.
		routeArray.splice(routeIndex, 1);
		routeIndex = routeIndex + currentOffset;
	}
	
	return endReached;
}


// Check whether a completed route meets the criteria.
function validateCompletedRoute(distVal, stopCount, criteriaList, skipCriteria)
{
	var criteriaMatch = true;
	var validRes = false;
	
	if (skipCriteria !== true)
	{
		criteriaMatch = possibleCriteriaValidation.loopComplete(distVal, stopCount, criteriaList);
	}
	
	if (criteriaMatch === true && stopCount > 0)
	{
		validRes = true;
	}
	
	return validRes;
}


// Reads incomplete route.
function readIncompleteRoute(baseNodeID, distVal, stopCount, criteriaList, skipCriteria, graphEdges)
{
	var criteriaMatch = true;
	var readRes = [];
	
	if (skipCriteria !== true)
	{
		// Check if criteria still met.
		criteriaMatch = possibleCriteriaValidation.loopIncomplete(distVal, stopCount, criteriaList);
	}
	
	if (criteriaMatch === true)
	{
		// Criteria met, retrieve adjacent edges from current node.
		readRes = graphTasks.getAdjacentEdges(baseNodeID, graphEdges);
	}
	
	return readRes;
}


module.exports =
{
	findRoutes: findPossibleRoutes
};