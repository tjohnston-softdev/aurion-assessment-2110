const graphTasks = require("./common/graph-tasks");
const dsktraTasks = require("./common/dsktra-tasks");

function findShortestRoute(graphObject, startNode, endNode)
{
	var dijkstraInfoObject = dsktraTasks.defineInfo();
	dsktraTasks.setNodes(dijkstraInfoObject, graphObject.nodes, startNode, endNode);
	
	if (dijkstraInfoObject.start !== null && dijkstraInfoObject.end !== null)
	{
		dsktraTasks.setClosed(dijkstraInfoObject);
		loopPathfinding(dijkstraInfoObject, graphObject);
	}
	else
	{
		// Unknown nodes.
	}
	
	return -1;
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
			
			console.log("");
			console.log("All Edges:");
			console.log(graphObj.edges);
			console.log("");
			console.log("Node: ", currentVisitingNode.nodeID);
			console.log("Dests: ", currentDestinationEdges);
		}
		
		canContinue = false;
	}
}






module.exports =
{
	findRoute: findShortestRoute
};