function defineDijkstraInfo()
{	
	var defineRes = {};
	
	defineRes["start"] = null;
	defineRes["end"] = null;
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
			dsktraInfo.start = nodeIndex;
		}
		
		if (currentChar === eNode)
		{
			dsktraInfo.end = nodeIndex;
		}
		
		dsktraInfo.nodes.push(currentRow);
	}
}


function sortNodeTable(tblObj)
{
	tblObj.sort(function (a,b)
	{
		return a.distanceFromStart - b.distanceFromStart;
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


function evaluateAdjacentNodes(baseID, baseDist, possibleEdges, dsktraInfo, edgeArray)
{
	var adjacentIndex = 0;
	var currentEdgeID = -1;
	var currentEdgeObject = {};
	var currentNodeID = -1;
	var currentNodeObject = {};
	var currentOldDist = -1;
	var currentNewDist = -1;
	
	for (adjacentIndex = 0; adjacentIndex < possibleEdges.length; adjacentIndex = adjacentIndex + 1)
	{
		currentEdgeID = possibleEdges[adjacentIndex];
		currentEdgeObject = edgeArray[currentEdgeID];
		currentNodeID = currentEdgeObject.destination;
		currentNodeObject = dsktraInfo.nodes[currentNodeID];
		currentOldDist = currentNodeObject.distanceFromStart;
		currentNewDist = baseDist + currentEdgeObject.distance;
		currentUpdate = false;
		
		if (currentNewDist < currentOldDist)
		{
			currentNodeObject.distanceFromStart = currentNewDist;
			currentNodeObject.previous = baseID
		}
	}
}



module.exports =
{
	defineInfo: defineDijkstraInfo,
	setNodes: setNodeTable,
	sortNodes: sortNodeTable,
	resetNodes: resetNodeTable,
	getVisitingNode: getCurrentVisitingNode,
	evaluateNodes: evaluateAdjacentNodes
};