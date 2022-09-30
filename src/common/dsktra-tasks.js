// Secondary functions for Dijkstra pathfinding.


function defineDijkstraInfo()
{
	return {start: null, end: null, nodes: []};
}



function setNodeTable(dsktraInfo, nodeArray, sNode, eNode)
{
	for (var nodeIndex = 0; nodeIndex < nodeArray.length; nodeIndex++)
	{
		var currentChar = nodeArray[nodeIndex];
		var currentRow = {};
		
		currentRow["nodeID"] = nodeIndex;
		currentRow["distanceFromStart"] = Number.POSITIVE_INFINITY;
		currentRow["previous"] = null;
		currentRow["visited"] = false;
		
		if (currentChar === sNode) dsktraInfo.start = nodeIndex;
		if (currentChar === eNode) dsktraInfo.end = nodeIndex;
		
		dsktraInfo.nodes.push(currentRow);
	}
}


// Sorts nodes by shortest distance first.
function sortNodeTable(tblObj)
{
	tblObj.sort(function (a, b)
	{
		return a.distanceFromStart - b.distanceFromStart;
	});
}


// Resets node sort order.
function resetNodeTable(tblObj)
{
	tblObj.sort(function(a, b)
	{
		return a.nodeID - b.nodeID;
	});
}


// Retrieve visit node for current iteration.
function getCurrentVisitingNode(tblObj)
{
	var rowIndex = 0;
	var visitRes = null;
	
	// Table already sorted by distance. This loop finds the first unvisited node.
	while (rowIndex >= 0 && rowIndex < tblObj.length && visitRes === null)
	{
		// Read current row.
		var currentNodeRow = tblObj[rowIndex];
		if (!currentNodeRow.visited) visitRes = currentNodeRow;
		rowIndex += 1;
	}
	
	return visitRes;
}


// Update adjacent nodes for current iteration.
function evaluateAdjacentNodes(baseID, baseDist, possibleEdges, dsktraInfo, edgeArray)
{	
	// Loop through marked edges with a possible destination.
	for (var adjacentIndex = 0; adjacentIndex < possibleEdges.length; adjacentIndex++)
	{
		var currentEdgeID = possibleEdges[adjacentIndex];
		var currentEdgeObject = edgeArray[currentEdgeID];
		
		var currentNodeID = currentEdgeObject.destination;
		var currentNodeObject = dsktraInfo.nodes[currentNodeID];
		
		var currentOldDist = currentNodeObject.distanceFromStart;
		var currentNewDist = baseDist + currentEdgeObject.distance;
		
		
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