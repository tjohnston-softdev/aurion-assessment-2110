const graphTasks = require("./common/graph-tasks");


function findShortestRoute(graphObject, startNode, endNode)
{
	var dijkstraInfoObject = defineDijkstraInfo();
	setNodeTable(dijkstraInfoObject, graphObject.nodes, startNode, endNode);
	
	if (dijkstraInfoObject.start !== null && dijkstraInfoObject.end !== null)
	{
		setClosedRoute(dijkstraInfoObject);
	}
	else
	{
		// Unknown nodes.
	}
	
	return -1;
}


function defineDijkstraInfo()
{	
	var defineRes = {};
	
	defineRes["start"] = null;
	defineRes["end"] = null;
	defineRes["closedRoute"] = false;
	defineRes["nodes"] = [];
	
	return defineRes;
}



function setNodeTable(dsktraInfo, nodeArray, sNode, eNode)
{
	var nodeIndex = 0;
	var currentChar = "";
	var currentRow = {};
	
	for (nodeIndex = 0; nodeIndex < nodeArray.length; nodeIndex = nodeIndex + 1)
	{
		currentChar = nodeArray[nodeIndex];
		currentRow = {};
		
		currentRow["nodeID"] = nodeIndex;
		currentRow["distanceFromStart"] = Number.POSITIVE_INFINITY;
		currentRow["previous"] = null;
		currentRow["visited"] = false;
		
		if (currentChar === sNode)
		{
			currentRow.distanceFromStart = 0;
			dsktraInfo.start = nodeIndex;
		}
		
		if (currentChar === eNode)
		{
			dsktraInfo.end = nodeIndex;
		}
		
		dsktraInfo.nodes.push(currentRow);
	}
}


function setClosedRoute(dsktraInfo)
{
	var nodesMatch = (dsktraInfo.start === dsktraInfo.end);
	dsktraInfo.closedRoute = nodesMatch;
}


function sortNodes(tblObj)
{
	tblObj.sort(function (a,b)
	{
		return a.visited - b.visited || a.distanceFromStart - b.distanceFromStart;
	});
}



module.exports =
{
	findRoute: findShortestRoute
};