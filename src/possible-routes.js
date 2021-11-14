// This script finds all possible routes between nodes based on criteria.

const graphTasks = require("./common/graph-tasks");
const routeTasks = require("./common/possible-route-tasks");
const numSigns = require("./common/enum/num-signs");
const routeCriteria = require("./common/route-criteria");
const possibleCriteriaValidation = require("./common/possible-criteria-validation");
const possibleCriteriaMessage = require("./common/possible-criteria-message");


// Main function.
function findPossibleRoutes(graphObject, startNode, endNode, criteriaListObject)
{
	var preparedNodes = {};
	var nodesValid = false;
	var criteriaValidation = {};
	
	var endReachPossible = false;
	var possibleRes = null;
	
	// Parse and validate node input.
	preparedNodes = routeTasks.parseNodes(graphObject.nodes, startNode, endNode);
	nodesValid = routeTasks.validateNodes(preparedNodes);
	
	// Validate route criteria.
	criteriaValidation = routeCriteria.validateCriteria(criteriaListObject);
	
	
	if (nodesValid === true && criteriaValidation.successful === true)
	{
		// Input valid, perform algorithm.
		endReachPossible = performInitialSequence(preparedNodes, graphObject, criteriaListObject, criteriaValidation.ignore);
		possibleRes = performMainSearch(preparedNodes, graphObject, criteriaListObject, criteriaValidation.ignore, endReachPossible);
	}
	else if (nodesValid === true)
	{
		// Invalid route criteria
		possibleRes = possibleCriteriaMessage.prepareText(criteriaValidation);
	}
	else
	{
		// Unknown nodes.
		possibleRes = graphTasks.getUnknownNodesText();
	}
	
	return possibleRes;
}


// Searches for a possible route in sequence.
function performInitialSequence(prepNodes, graphObj, criteriaListObj, ignoreCriteria)
{
	var routeBacklog = routeTasks.initializeBacklog(prepNodes.start);
	var exploredRoutes = [];
	
	var loopNumber = 1;
	var loopCutoff = Math.ceil(graphObj.nodes.length * 1.15);
	var sequenceFound = false;
	
	// Loop until possible route is found without backtracking, or too many iterations.
	while (loopNumber >= 1 && loopNumber <= loopCutoff && sequenceFound !== true)
	{
		// Iterate through current set of routes.
		sequenceFound = iterateRoutes(prepNodes, graphObj.edges, criteriaListObj, ignoreCriteria, routeBacklog, exploredRoutes, false);
		loopNumber = loopNumber + 1;
	}
	
	return sequenceFound;
}


// Search for all possible routes.
function performMainSearch(prepNodes, graphObj, criteriaListObj, ignoreCriteria, loopEnabled)
{
	var routeBacklog = routeTasks.initializeBacklog(prepNodes.start);
	var completedRoutes = [];
	
	if (loopEnabled === true)
	{
		// Loop until all possible routes have been explored.
		while (routeBacklog.length > 0)
		{
			// Iterate through current set of routes.
			iterateRoutes(prepNodes, graphObj.edges, criteriaListObj, ignoreCriteria, routeBacklog, completedRoutes, true);
		}
	}
	
	var searchRes = routeTasks.countValidRoutes(completedRoutes);
	return searchRes;
}


// Loop through current set of possible routes.
function iterateRoutes(pNodes, graphEdgeArr, critListArr, ignoreCrit, routeArray, compArray, allowBacktracking)
{
	var routeIndex = 0;
	var currentRoute = {};
	var currentStops = -1;
	var currentNode = -1;
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
		
		// Reset result variables.
		currentEndValid = false;				// Completed route can be saved.
		currentBranchAllowed = true;			// Backlog route can be explored.
		currentAdjEdges = [];					// Edges adjacent to current node.
		currentOffset = 0;						// Loop index offset.
		
		
		// If end node has been reached, save it, and check whether it should be explored further.
		if (currentNode === pNodes.end)
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