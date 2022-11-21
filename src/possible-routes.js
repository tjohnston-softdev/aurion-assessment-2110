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
	
	if (criteriaValidation.successful)
	{
		// Input valid - Prepare criteria and validate templates.
		useIgnore = criteriaValidation.ignore;
		criteriaInspection = routeTasks.inspectCriteria(inputGraphObject.nodes, criteriaListObject, useIgnore);
		templateValidation = routeTemplate.compileObjects(inputGraphObject.nodes, criteriaListObject, criteriaInspection, useIgnore);
	}
	
	if (templateValidation.successful)
	{
		// Templates valid - Perform initial sequencing from start to end nodes.
		searchPrepared = true;
		preparedStartNodes = performInitialSequence(criteriaInspection, inputGraphObject, criteriaListObject, useIgnore);
	}
	
	
	if (searchPrepared && preparedStartNodes.length > 0 && criteriaInspection.cutoffSet)
	{
		// Search possible routes.
		possibleRes = performMainSearch(criteriaInspection, inputGraphObject, criteriaListObject, useIgnore, preparedStartNodes);
	}
	else if (searchPrepared && preparedStartNodes.length > 0)
	{
		// Infinite number of routes.
		possibleRes = Number.POSITIVE_INFINITY;
	}
	else if (searchPrepared)
	{
		// No possible routes.
		possibleRes = [];
	}
	else if (criteriaValidation.successful)
	{
		// Invalid templates.
		possibleRes = possibleCriteriaMessage.prepareText(templateValidation);
	}
	else
	{
		// Invalid input.
		possibleRes = possibleCriteriaMessage.prepareText(criteriaValidation);
	}
	
	
	return possibleRes;
}


// Searches for a possible route in sequence.
function performInitialSequence(inspectObj, graphObject, criteriaListObj, ignoreCriteria)
{
	var maxIterations = Math.ceil(graphObject.nodes.length * 1.15);
	var endNodesList = inspectObj.endNodes;
	var successfulNodes = [];
	
	
	// Loop graph nodes.
	for (var nodeIndex = 0; nodeIndex < graphObject.nodes.length; nodeIndex++)
	{
		// Check if the current node is a start point. If there are no start nodes, use all of them.
		var currentStart = inspectObj.startNodes.includes(nodeIndex);
		var currentLoop = (currentStart || inspectObj.startNodes.length <= 0);
		
		// Initializes route starting from current node.
		var currentIteration = 1;
		var currentBacklog = routeTasks.initializeSingleBacklog(nodeIndex);
		var currentExplored = [];
		var currentFound = false;
		
		// Sequence from current node to any valid end point.
		while (currentIteration >= 1 && currentIteration <= maxIterations && !currentFound && currentLoop)
		{
			// Iterate through current set of routes.
			currentFound = iterateRoutes(endNodesList, graphObject, criteriaListObj, ignoreCriteria, currentBacklog, currentExplored, false, true);
			routeTasks.filterValidRoutes(currentExplored);
			currentIteration = currentIteration + 1;
		}
		
		// Add valid start point.
		if (currentFound) successfulNodes.push(nodeIndex);
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
		routeTasks.filterValidRoutes(completedRoutes);
	}
	
	// Remove invalid routes.
	routeTasks.filterValidRoutes(completedRoutes);
	
	
	return completedRoutes;
}


// Loop through current set of possible routes.
function iterateRoutes(endList, graphObj, critListArr, ignoreCrit, routeArray, compArray, allowBacktracking, seqOnly)
{
	var routeIndex = 0;
	var endReached = false;
	var canContinue = true;
	
	while (routeIndex >= 0 && routeIndex < routeArray.length && canContinue)
	{
		// Read current route with number of stops and previous node.
		var currentRoute = routeArray[routeIndex];
		var currentStops = currentRoute.steps.length - 1;
		var currentNode = currentRoute.steps[currentStops];
		var currentEndPoint = endList.includes(currentNode);
		
		// Reset result variables.
		var currentEndValid = false;				// Completed route can be saved.
		var currentBranchAllowed = true;			// Backlog route can be explored.
		var currentAdjEdges = [];					// Edges adjacent to current node.
		var currentOffset = 0;						// Loop index offset.
		
		
		// If end node has been reached, save it, and check whether it should be explored further.
		if (currentEndPoint || endList.length === 0)
		{
			currentEndValid = validateCompletedRoute(currentRoute, graphObj.nodes, critListArr, ignoreCrit);
			currentBranchAllowed = routeTasks.saveComplete(routeIndex, currentRoute, routeArray, compArray, currentEndValid);
			endReached = (currentStops > 0);
		}
		
		
		if (currentBranchAllowed)
		{
			// Derive new routes from possible destinations.
			currentAdjEdges = readIncompleteRoute(currentNode, currentRoute.distance, currentStops, critListArr, ignoreCrit, graphObj.edges);
			currentOffset = routeTasks.deriveNew(routeIndex, currentRoute, currentAdjEdges, graphObj.edges, endList, routeArray, allowBacktracking);
		}
		
		
		// Remove current route from backlog and update loop variables.
		routeArray.splice(routeIndex, 1);
		routeIndex = routeIndex + currentOffset;
		canContinue = (!endReached || !seqOnly);
	}
	
	return endReached;
}


// Check whether a completed route meets the criteria.
function validateCompletedRoute(compRoute, graphNodesList, criteriaList, skipCriteria)
{
	var criteriaMatch = true;
	
	if (!skipCriteria)
	{
		// Check if criteria has been met.
		criteriaMatch = possibleCriteriaValidation.loopComplete(compRoute, graphNodesList, criteriaList);
	}
	
	return (criteriaMatch && compRoute.steps.length > 1)
}


// Reads incomplete route.
function readIncompleteRoute(baseNodeID, distVal, stopCount, criteriaList, skipCriteria, graphEdges)
{
	var criteriaMatch = true;
	var readRes = [];
	
	if (!skipCriteria)
	{
		// Check if criteria still met.
		criteriaMatch = possibleCriteriaValidation.loopIncomplete(distVal, stopCount, criteriaList);
	}
	
	if (criteriaMatch)
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