// This script finds the shortest path between nodes using Dijkstra's algorithm.

const graphTasks = require("./common/graph-tasks");
const dsktraTasks = require("./common/dsktra-tasks");


// Main function.
function findShortestRoute(graphObject, startNode, endNode)
{
	var dijkstraInfoObject = dsktraTasks.defineInfo();
	var shortRouteRes = null;
	
	// Prepare nodes table.
	dsktraTasks.setNodes(dijkstraInfoObject, graphObject.nodes, startNode, endNode);
	
	if (dijkstraInfoObject.start !== null && dijkstraInfoObject.end !== null)
	{
		// Start and end nodes valid - Execute algorithm.
		visitStartNode(dijkstraInfoObject, graphObject);
		visitOtherNodes(dijkstraInfoObject, graphObject);
		shortRouteRes = checkRouteSuccessful(dijkstraInfoObject);
	}
	else
	{
		// Unknown nodes.
		shortRouteRes = graphTasks.getUnknownNodesText();
	}
	
	return shortRouteRes;
}


// First iteration of Dijkstra, visiting the start node.
function visitStartNode(dsktraInfoObj, graphObj)
{
	var startID = -1;
	var startObj = null;
	var adjEdges = [];
	
	// Read start node.
	startID = dsktraInfoObj.start;
	startObj = dsktraInfoObj.nodes[startID];
	
	// Retrieve destination nodes and update accordingly.
	adjEdges = graphTasks.getAdjacentEdges(startID, graphObj.edges);
	dsktraTasks.evaluateNodes(startID, 0, adjEdges, dsktraInfoObj, graphObj.edges);
	
	// Start node visited.
	startObj.visited = true;
}


// Continue iterating over other graph nodes.
function visitOtherNodes(dsktraInfoObj, graphObj)
{
	var currentVisitingNode = null;
	var currentID = -1;
	var currentDistance = -1;
	var currentAdjEdges = [];
	
	var canContinue = true;
	
	// Loop until all nodes visited.
	while (canContinue === true)
	{
		currentVisitingNode = null;
		currentID = -1;
		currentDistance = -1;
		currentAdjEdges = [];
		
		// Get unvisited node with shortest distance from start.
		dsktraTasks.sortNodes(dsktraInfoObj.nodes);
		currentVisitingNode = dsktraTasks.getVisitingNode(dsktraInfoObj.nodes);
		
		
		// Check if visiting node retrieved successfully.
		if (currentVisitingNode !== null)
		{
			// Reset sort order.
			dsktraTasks.resetNodes(dsktraInfoObj.nodes);
			
			// Read visiting node.
			currentID = currentVisitingNode.nodeID;
			currentDistance = currentVisitingNode.distanceFromStart;
			
			// Retrieve destination nodes and update accordingly.
			currentAdjEdges = graphTasks.getAdjacentEdges(currentVisitingNode.nodeID, graphObj.edges);
			dsktraTasks.evaluateNodes(currentID, currentDistance, currentAdjEdges, dsktraInfoObj, graphObj.edges);
			
			// Node visited.
			currentVisitingNode.visited = true;
		}
		else
		{
			// All nodes visited - End loop.
			canContinue = false;
		}
	}
	
	// Reset node sort order after loop complete.
	dsktraTasks.resetNodes(dsktraInfoObj.nodes);
	
}

// Check if Dijkstra pathfinding was successful.
function checkRouteSuccessful(dsktraInfoObj)
{
	var endID = -1;
	var endObj = {};
	var distVal = -1;
	var distSet = false;
	var checkRes = null;
	
	// Read end node.
	endID = dsktraInfoObj.end;
	endObj = dsktraInfoObj.nodes[endID];
	
	// Read end distance from start.
	distVal = endObj.distanceFromStart;
	distSet = Number.isInteger(distVal);
	
	
	// End node must have been visited with a set distance.
	if (distSet === true && endObj.visited === true)
	{
		// Return total distance.
		checkRes = distVal;
	}
	else
	{
		// Return message.
		checkRes = "NO SUCH ROUTE";
	}
	
	return checkRes;
}



module.exports =
{
	findRoute: findShortestRoute
};