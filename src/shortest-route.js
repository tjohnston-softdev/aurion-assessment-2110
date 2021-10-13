const graphTasks = require("./common/graph-tasks");


function findShortestRoute(graphObject, startNode, endNode)
{
	var nodeTable = [];
	return -1;
}


function defineDijkstraTable(nodeArray, sNode)
{
	var nodeIndex = 0;
	var currentChar = "";
	var currentRow = {};
	
	var tableRes = [];
	
	for (nodeIndex = 0; nodeIndex < nodeArray.length; nodeIndex = nodeIndex + 1)
	{
		currentChar = nodeArray[nodeIndex];
		currentRow = {};
		
		currentRow["nodeID"] = nodeIndex;
		currentRow["start"] = false;
		currentRow["distanceFromStart"] = Number.POSITIVE_INFINITY;
		currentRow["previous"] = null;
		currentRow["visited"] = false;
		
		if (currentChar === sNode)
		{
			currentRow.start = true;
			currentRow.distanceFromStart = 0;
		}
		
		tableRes.push(currentRow);
	}
	
	return tableRes;
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