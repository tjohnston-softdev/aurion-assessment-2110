const graphTasks = require("./common/graph-tasks");


function findShortestRoute(graphObject, startNode, endNode)
{
	var nodeTable = [];
	return -1;
}


function defineDijkstraTable(nodeArray, sNode, eNode)
{
	var nodeIndex = 0;
	var currentChar = "";
	var currentRow = {};
	
	var defineRes = {};
	
	defineRes["start"] = null;
	defineRes["end"] = null;
	defineRes["closed"] = false;
	defineRes["nodes"] = [];
	
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
			defineRes.start = nodeIndex;
		}
		
		if (currentChar === eNode)
		{
			defineRes.end = nodeIndex;
		}
		
		defineRes.nodes.push(currentRow);
	}
	
	return defineRes;
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