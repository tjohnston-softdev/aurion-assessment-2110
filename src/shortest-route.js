const graphTasks = require("./common/graph-tasks");
const dsktraTasks = require("./common/dsktra-tasks");

function findShortestRoute(graphObject, startNode, endNode)
{
	var dijkstraInfoObject = dsktraTasks.defineInfo();
	var shortRouteRes = null;
	
	dsktraTasks.setNodes(dijkstraInfoObject, graphObject.nodes, startNode, endNode);
	
	if (dijkstraInfoObject.start !== null && dijkstraInfoObject.end !== null)
	{
		visitStartNode(dijkstraInfoObject, graphObject);
		visitOtherNodes(dijkstraInfoObject, graphObject);
		shortRouteRes = checkRouteSuccessful(dijkstraInfoObject);
	}
	else
	{
		shortRouteRes = "UNKNOWN NODES";
	}
	
	return shortRouteRes;
}


function visitStartNode(dsktraInfoObj, graphObj)
{
	var startID = dsktraInfoObj.start;
	var startObj = dsktraInfoObj.nodes[startID];
	var adjEdges = graphTasks.getAdjacentEdges(startID, graphObj.edges);
	dsktraTasks.evaluateNodes(startID, 0, adjEdges, dsktraInfoObj, graphObj.edges);
	startObj.visited = true;
}


function visitOtherNodes(dsktraInfoObj, graphObj)
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
		else
		{
			canContinue = false;
		}
	}
	
	dsktraTasks.resetNodes(dsktraInfoObj.nodes);
}

function checkRouteSuccessful(dsktraInfoObj)
{
	var endID = dsktraInfoObj.end;
	var endObj = dsktraInfoObj.nodes[endID];
	var distVal = endObj.distanceFromStart;
	var distSet = Number.isInteger(distVal);
	var checkRes = null;
	
	if (distSet === true && endObj.visited === true)
	{
		checkRes = distVal;
	}
	else
	{
		checkRes = "NO SUCH ROUTE";
	}
	
	return checkRes;
}





module.exports =
{
	findRoute: findShortestRoute
};