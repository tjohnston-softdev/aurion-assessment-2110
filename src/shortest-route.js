// This script finds the shortest path between nodes using Dijkstra's algorithm.

const graphTasks = require("./common/graph-tasks");
const dsktraTasks = require("./common/dsktra-tasks");


// Main function.
function findShortestRoute(inputGraphObject, startNode, endNode)
{
	var dijkstraInfoObject = dsktraTasks.defineInfo();
	var shortRouteRes = null;
	
	// Prepare nodes table.
	dsktraTasks.setNodes(dijkstraInfoObject, inputGraphObject.nodes, startNode, endNode);
	
	if (dijkstraInfoObject.start !== null && dijkstraInfoObject.end !== null)
	{
		// Start and end nodes valid - Execute algorithm.
		visitStartNode(dijkstraInfoObject, inputGraphObject);
		visitOtherNodes(dijkstraInfoObject, inputGraphObject);
		shortRouteRes = checkRouteSuccessful(dijkstraInfoObject);
	}
	else if (dijkstraInfoObject.start !== null)
	{
		shortRouteRes = "MISSING END NODE";
	}
	else
	{
		shortRouteRes = "MISSING START NODE";
	}
	
	return shortRouteRes;
}


// First iteration of Dijkstra, visiting the start node.
function visitStartNode(dsktraInfoObj, graphObject)
{
	// Read start node.
	var startID = dsktraInfoObj.start;
	var startObj = dsktraInfoObj.nodes[startID];
	
	// Retrieve destination nodes and update accordingly.
	var adjEdges = graphTasks.getAdjacentEdges(startID, graphObject.edges);
	dsktraTasks.evaluateNodes(startID, 0, adjEdges, dsktraInfoObj, graphObject.edges);
	
	// Start node visited.
	startObj.visited = true;
}


// Continue iterating over other graph nodes.
function visitOtherNodes(dsktraInfoObj, graphObject)
{	
	var canContinue = true;
	
	// Loop until all nodes visited.
	while (canContinue)
	{
		var currentVisitingNode = null;
		var currentID = -1;
		var currentDistance = -1;
		var currentAdjEdges = [];
		
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
			currentAdjEdges = graphTasks.getAdjacentEdges(currentVisitingNode.nodeID, graphObject.edges);
			dsktraTasks.evaluateNodes(currentID, currentDistance, currentAdjEdges, dsktraInfoObj, graphObject.edges);
			
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
	var endID = dsktraInfoObj.end;
	var endObj = dsktraInfoObj.nodes[endID];
	
	// Read end distance from start.
	var distVal = endObj.distanceFromStart;
	var distSet = Number.isInteger(distVal);
	
	return (distSet && endObj.visited) ? distVal : graphTasks.getNoRouteText();
}



module.exports =
{
	findRoute: findShortestRoute
};