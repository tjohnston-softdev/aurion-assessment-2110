const graphTasks = require("./common/graph-tasks");
const dsktraTasks = require("./common/dsktra-tasks");

function findShortestRoute(graphObject, startNode, endNode)
{
	var dijkstraInfoObject = dsktraTasks.defineInfo();
	dsktraTasks.setNodes(dijkstraInfoObject, graphObject.nodes, startNode, endNode);
	
	if (dijkstraInfoObject.start !== null && dijkstraInfoObject.end !== null)
	{
		dsktraTasks.setClosed(dijkstraInfoObject);
		visitStartNode(dijkstraInfoObject, graphObject);
		loopPathfinding(dijkstraInfoObject, graphObject);
	}
	else
	{
		// Unknown nodes.
	}
	
	return -1;
}


function visitStartNode(dsktraInfoObj, graphObj)
{
	var startID = dsktraInfoObj.start;
	var startObj = dsktraInfoObj.nodes[startID];
	var adjEdges = graphTasks.getAdjacentEdges(startID, graphObj.edges);
	dsktraTasks.evaluateNodes(startID, 0, adjEdges, dsktraInfoObj, graphObj.edges);
	startObj.visited = true;
}


function loopPathfinding(dsktraInfoObj, graphObj)
{
	var currentVisitingNode = null;
	var currentID = -1;
	var currentDistance = -1;
	var currentAdjEdges = [];
	var canContinue = true;
	
	while (canContinue === true)
	{
		currentVisitingNode = null;
		currentID = -1;
		currentDistance = -1;
		currentAdjEdges = [];
		
		dsktraTasks.sortNodes(dsktraInfoObj.nodes);
		currentVisitingNode = dsktraTasks.getVisitingNode(dsktraInfoObj.nodes);
		
		if (currentVisitingNode !== null)
		{
			dsktraTasks.resetNodes(dsktraInfoObj.nodes);
			currentID = currentVisitingNode.nodeID;
			currentDistance = currentVisitingNode.distanceFromStart;
			currentAdjEdges = graphTasks.getAdjacentEdges(currentVisitingNode.nodeID, graphObj.edges);
			dsktraTasks.evaluateNodes(currentID, currentDistance, currentAdjEdges, dsktraInfoObj, graphObj.edges);
			currentVisitingNode.visited = true;
		}
		
		console.log(dsktraInfoObj.nodes);
		canContinue = false;
	}
}






module.exports =
{
	findRoute: findShortestRoute
};