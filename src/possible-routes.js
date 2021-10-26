// This script finds all possible routes between nodes based on criteria.

const graphTasks = require("./common/graph-tasks");
const routeTasks = require("./common/possible-route-tasks");
const numSigns = require("./common/num-signs");
const routeCriteria = require("./common/route-criteria");


// Main function.
function findPossibleRoutes(graphObject, startNode, endNode, stopCountCriteria, distanceCriteria)
{
	var preparedNodes = {};
	var nodesValid = false;
	var countValid = false;
	var distValid = false;
	var endReachPossible = false;
	var possibleRes = null;
	
	// Parse and validate node input.
	preparedNodes = routeTasks.parseNodes(graphObject.nodes, startNode, endNode);
	nodesValid = routeTasks.validateNodes(preparedNodes);
	
	// Validate route criteria.
	countValid = routeCriteria.validateCriteria(stopCountCriteria);
	distValid = routeCriteria.validateCriteria(distanceCriteria);
	
	
	if (nodesValid === true && countValid === true && distValid === true)
	{
		// Input valid, perform algorithm.
		endReachPossible = performInitialSequence(preparedNodes, graphObject, stopCountCriteria, distanceCriteria);
		possibleRes = performSearch(preparedNodes, graphObject, stopCountCriteria, distanceCriteria, endReachPossible);
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
		// Unknown nodes.
		possibleRes = graphTasks.getUnknownNodesText();
	}
	
	return possibleRes;
}


// Searches for a possible route in sequence.
function performInitialSequence(prepNodes, graphObj, stopCountCritObject, distanceCritObject)
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
		sequenceFound = iterateRoutes(prepNodes, graphObj.edges, stopCountCritObject, distanceCritObject, routeBacklog, exploredRoutes, false);
		loopNumber = loopNumber + 1;
	}
	
	return sequenceFound;
}


// Search for all possible routes.
function performSearch(prepNodes, graphObj, stopCountCritObject, distanceCritObject, loopEnabled)
{
	var routeBacklog = routeTasks.initializeBacklog(prepNodes.start);
	var completedRoutes = [];
	
	if (loopEnabled === true)
	{
		// Loop until all possible routes have been explored.
		while (routeBacklog.length > 0)
		{
			// Iterate through current set of routes.
			iterateRoutes(prepNodes, graphObj.edges, stopCountCritObject, distanceCritObject, routeBacklog, completedRoutes, true);
		}
	}
	
	var searchRes = routeTasks.countValidRoutes(completedRoutes);
	return searchRes;
}


// Loop through current set of possible routes.
function iterateRoutes(pNodes, graphEdgeArr, stopCriteriaObj, distCriteriaObj, routeArray, compArray, allowBacktracking)
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
			currentEndValid = validateCompletedRoute(currentRoute.distance, currentStops, stopCriteriaObj, distCriteriaObj);
			currentBranchAllowed = routeTasks.saveComplete(routeIndex, currentRoute, routeArray, compArray, currentEndValid);
			endReached = true;
		}
		
		
		if (currentBranchAllowed === true)
		{
			// Derive new routes from possible destinations.
			currentAdjEdges = readIncompleteRoute(currentNode, currentRoute.distance, currentStops, stopCriteriaObj, distCriteriaObj, graphEdgeArr);
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


// Reads incomplete route.
function readIncompleteRoute(baseNodeID, distVal, stopCount, stopCriteria, distCriteria, graphEdges)
{
	var stopCountValid = false;
	var distanceValid = false;
	var readRes = [];
	
	// Check if criteria still met.
	stopCountValid = checkIncompleteRouteCriteriaMatch(stopCount, stopCriteria);
	distanceValid = checkIncompleteRouteCriteriaMatch(distVal, distCriteria);
	
	if (stopCountValid === true && distanceValid === true)
	{
		// Criteria met, retrieve adjacent edges from current node.
		readRes = graphTasks.getAdjacentEdges(baseNodeID, graphEdges);
	}
	
	return readRes;
}



// Check if a completed route meets the given criteria.
function checkCompletedRouteCriteriaMatch(actualValue, criteriaObj)
{
	var matchRes = false;
	
	if (criteriaObj === null)
	{
		// Criteria not set.
		matchRes = true;
	}
	else if (criteriaObj.sign === numSigns.LESS && actualValue < criteriaObj.number)
	{
		// Less than.
		matchRes = true;
	}
	else if (criteriaObj.sign === numSigns.LESS_EQUAL && actualValue <= criteriaObj.number)
	{
		// Less than or equal to.
		matchRes = true;
	}
	else if (criteriaObj.sign === numSigns.EQUAL && actualValue === criteriaObj.number)
	{
		// Equal.
		matchRes = true;
	}
	else if (criteriaObj.sign === numSigns.GREAT && actualValue > criteriaObj.number)
	{
		// Greater than.
		matchRes = true;
	}
	else if (criteriaObj.sign === numSigns.GREAT_EQUAL && actualValue >= criteriaObj.number)
	{
		// Greater than or equal to.
		matchRes = true;
	}
	else
	{
		// Invalid.
		matchRes = false;
	}
	
	return matchRes;
}

// Check if an incomplete route meets the given criteria.
function checkIncompleteRouteCriteriaMatch(actualValue, criteriaObj)
{
	var matchRes = false;
	
	if (criteriaObj === null)
	{
		// Criteria not set.
		matchRes = true;
	}
	else if (criteriaObj.sign === numSigns.LESS && actualValue >= criteriaObj.number)
	{
		// Above inclusive cutoff.
		matchRes = false;
	}
	else if (criteriaObj.sign === numSigns.LESS_EQUAL && actualValue > criteriaObj.number)
	{
		// Above exclusive cutoff.
		matchRes = false;
	}
	else if (criteriaObj.sign === numSigns.EQUAL && actualValue > criteriaObj.number)
	{
		// Above target.
		matchRes = false;
	}
	else
	{
		// Criteria met.
		matchRes = true;
	}
	
	return matchRes;
}



module.exports =
{
	findRoutes: findPossibleRoutes
};