// This script finds all possible routes between nodes based on criteria.

const graphTasks = require("./common/graph-tasks");
const routeTasks = require("./common/possible-route-tasks");
const numSigns = require("./common/enum/num-signs");
const routeCriteria = require("./common/route-criteria");
const routeTemplate = require("./common/possible-route-template");
const possibleCriteriaValidation = require("./common/possible-criteria-validation");
const possibleCriteriaMessage = require("./common/possible-criteria-message");


// Main function.
function findPossibleRoutes(inputGraphObject, criteriaListObject)
{
	var criteriaValidation = routeCriteria.validateCriteria(inputGraphObject.nodes, criteriaListObject);
	var useIgnore = false;
	var criteriaInspection = {};
	var templateValidation = {};
	var searchPrepared = false;
	var preparedStartNodes = [];
	var possibleRes = null;
	
	if (criteriaValidation.successful === true)
	{
		useIgnore = criteriaValidation.ignore;
		criteriaInspection = routeTasks.inspectCriteria(inputGraphObject.nodes, criteriaListObject, useIgnore);
		templateValidation = routeTemplate.compileObjects(inputGraphObject.nodes, criteriaListObject, criteriaInspection, useIgnore);
	}
	
	if (templateValidation.successful === true)
	{
		searchPrepared = true;
		preparedStartNodes = performInitialSequence(criteriaInspection, inputGraphObject, criteriaListObject, useIgnore);
	}
	
	
	if (searchPrepared === true && preparedStartNodes.length > 0 && criteriaInspection.cutoffSet === true)
	{
		possibleRes = performMainSearch(criteriaInspection, inputGraphObject, criteriaListObject, useIgnore, preparedStartNodes);
	}
	else if (searchPrepared === true && preparedStartNodes.length > 0)
	{
		possibleRes = Number.POSITIVE_INFINITY;
	}
	else if (searchPrepared === true)
	{
		possibleRes = 0;
	}
	else if (criteriaValidation.successful === true)
	{
		possibleRes = possibleCriteriaMessage.prepareText(templateValidation);
	}
	else
	{
		possibleRes = possibleCriteriaMessage.prepareText(criteriaValidation);
	}
	
	
	return possibleRes;
}


// Searches for a possible route in sequence.
function performInitialSequence(inspectObj, graphObject, criteriaListObj, ignoreCriteria)
{
	var maxIterations = Math.ceil(graphObject.nodes.length * 1.15);
	var endNodesList = inspectObj.endNodes;
	
	var nodeIndex = 0;
	var currentStart = false;
	var currentLoop = false;
	
	var currentIteration = 1;
	var currentBacklog = [];
	var currentExplored = [];
	var currentFound = false;
	
	var successfulNodes = [];
	
	for (nodeIndex = 0; nodeIndex < graphObject.nodes.length; nodeIndex = nodeIndex + 1)
	{
		currentStart = inspectObj.startNodes.includes(nodeIndex);
		currentLoop = (currentStart === true || inspectObj.startNodes.length <= 0);
		
		currentIteration = 1;
		currentBacklog = routeTasks.initializeSingleBacklog(nodeIndex);
		currentExplored = [];
		currentFound = false;
		
		while (currentIteration >= 1 && currentIteration <= maxIterations && currentFound !== true && currentLoop === true)
		{
			// Iterate through current set of routes.
			currentFound = iterateRoutes(endNodesList, graphObject, criteriaListObj, ignoreCriteria, currentBacklog, currentExplored, false, true);
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
function performMainSearch(inspectObj, graphObject, criteriaListObj, ignoreCriteria, startPoints)
{
	var endNodesList = inspectObj.endNodes;
	var useBack = inspectObj.backtrack;
	var routeBacklog = routeTasks.initializeMultipleBacklog(startPoints);
	var completedRoutes = [];
	
	// Loop until all possible routes have been explored.
	while (routeBacklog.length > 0)
	{
		// Iterate through current set of routes.
		iterateRoutes(endNodesList, graphObject, criteriaListObj, ignoreCriteria, routeBacklog, completedRoutes, useBack, false);
	}
	
	routeTasks.filterValidRoutes(completedRoutes);
	return completedRoutes;
}


// Loop through current set of possible routes.
function iterateRoutes(endList, graphObj, critListArr, ignoreCrit, routeArray, compArray, allowBacktracking, seqOnly)
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
	var canContinue = true;
	
	while (routeIndex >= 0 && routeIndex < routeArray.length && canContinue === true)
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
			currentEndValid = validateCompletedRoute(currentRoute, graphObj.nodes, critListArr, ignoreCrit);
			currentBranchAllowed = routeTasks.saveComplete(routeIndex, currentRoute, routeArray, compArray, currentEndValid);
			endReached = (currentStops > 0);
		}
		
		
		if (currentBranchAllowed === true)
		{
			// Derive new routes from possible destinations.
			currentAdjEdges = readIncompleteRoute(currentNode, currentRoute.distance, currentStops, critListArr, ignoreCrit, graphObj.edges);
			currentOffset = routeTasks.deriveNew(routeIndex, currentRoute, currentAdjEdges, graphObj.edges, endList, routeArray, allowBacktracking);
		}
		
		
		// Remove current route from backlog and update loop variables.
		routeArray.splice(routeIndex, 1);
		routeIndex = routeIndex + currentOffset;
		canContinue = (endReached !== true || seqOnly !== true);
	}
	
	return endReached;
}


// Check whether a completed route meets the criteria.
function validateCompletedRoute(compRoute, graphNodesList, criteriaList, skipCriteria)
{
	var criteriaMatch = true;
	var validRes = false;
	
	if (skipCriteria !== true)
	{
		criteriaMatch = possibleCriteriaValidation.loopComplete(compRoute, graphNodesList, criteriaList);
	}
	
	if (criteriaMatch === true && compRoute.steps.length > 1)
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