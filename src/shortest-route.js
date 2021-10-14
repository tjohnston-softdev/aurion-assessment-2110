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
		//loopPathfinding(dijkstraInfoObject, graphObject);
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
	var adjacentEdges = graphTasks.getAdjacentEdges(startID, graphObj.edges);
	dsktraTasks.evaluateNodes(startID, 0, adjacentEdges, dsktraInfoObj, graphObj.edges);
	startObj.visited = true;
	console.log(dsktraInfoObj.nodes);
}


function loopPathfinding(dsktraInfoObj, graphObj)
{
	var currentVisitingNode = null;
	var currentDestinationEdges = [];
	var canContinue = true;
	
	while (canContinue === true)
	{
		currentVisitingNode = null;
		currentDestinationEdges = [];
		
		dsktraTasks.sortNodes(dsktraInfoObj.nodes);
		currentVisitingNode = dsktraTasks.getVisitingNode(dsktraInfoObj.nodes);
		
		if (currentVisitingNode !== null)
		{
			dsktraTasks.resetNodes(dsktraInfoObj.nodes);
			currentDestinationEdges = graphTasks.getAdjacentEdges(currentVisitingNode.nodeID, graphObj.edges);
		}
		
		canContinue = false;
	}
}






module.exports =
{
	findRoute: findShortestRoute
};