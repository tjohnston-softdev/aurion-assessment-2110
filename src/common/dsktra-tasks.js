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


function sortNodeTable(tblObj)
{
	tblObj.sort(function (a,b)
	{
		return a.visited - b.visited || a.distanceFromStart - b.distanceFromStart;
	});
}


function resetNodeTable(tblObj)
{
	tblObj.sort(function(a,b)
	{
		return a.nodeID - b.nodeID;
	});
}


function getCurrentVisitingNode(tblObj)
{
	var rowIndex = 0;
	var currentNodeRow = {};
	var visitRes = null;
	
	while (rowIndex >= 0 && rowIndex < tblObj.length && visitRes === null)
	{
		currentNodeRow = tblObj[rowIndex];
		
		if (currentNodeRow.visited !== true)
		{
			visitRes = currentNodeRow;
		}
		
		rowIndex = rowIndex + 1;
	}
	
	return visitRes;
}



module.exports =
{
	defineInfo: defineDijkstraInfo,
	setNodes: setNodeTable,
	setClosed: setClosedRoute,
	sortNodes: sortNodeTable,
	resetNodes: resetNodeTable,
	getVisitingNode: getCurrentVisitingNode
};