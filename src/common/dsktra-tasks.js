// Secondary functions for Dijkstra pathfinding.

// Pathfinding metadata.
function defineDijkstraInfo()
{	
	var defineRes = {};
	
	defineRes["start"] = null;			// Start node ID.
	defineRes["end"] = null;			// End node ID.
	defineRes["nodes"] = [];			// Node table.
	
	return defineRes;
}



// Prepare nodes table.
function setNodeTable(dsktraInfo, nodeArray, sNode, eNode)
{
	var nodeIndex = 0;
	var currentChar = "";
	var currentRow = {};
	
	for (nodeIndex = 0; nodeIndex < nodeArray.length; nodeIndex = nodeIndex + 1)
	{
		// Read current node.
		currentChar = nodeArray[nodeIndex];
		currentRow = {};
		
		// Define current row.
		currentRow["nodeID"] = nodeIndex;
		currentRow["distanceFromStart"] = Number.POSITIVE_INFINITY;
		currentRow["previous"] = null;
		currentRow["visited"] = false;
		
		// Mark start node.
		if (currentChar === sNode)
		{
			dsktraInfo.start = nodeIndex;
		}
		
		// Mark end node.
		if (currentChar === eNode)
		{
			dsktraInfo.end = nodeIndex;
		}
		
		// Row complete.
		dsktraInfo.nodes.push(currentRow);
	}
}


// Sorts nodes by shortest distance first.
function sortNodeTable(tblObj)
{
	tblObj.sort(function (a,b)
	{
		return a.distanceFromStart - b.distanceFromStart;
	});
}


// Resets node sort order.
function resetNodeTable(tblObj)
{
	tblObj.sort(function(a,b)
	{
		return a.nodeID - b.nodeID;
	});
}


// Retrieve visit node for current iteration.
function getCurrentVisitingNode(tblObj)
{
	var rowIndex = 0;
	var currentNodeRow = {};
	var visitRes = null;
	
	// Table already sorted by distance. This loop finds the first unvisited node.
	while (rowIndex >= 0 && rowIndex < tblObj.length && visitRes === null)
	{
		// Read current row.
		currentNodeRow = tblObj[rowIndex];
		
		if (currentNodeRow.visited !== true)
		{
			// Found.
			visitRes = currentNodeRow;
		}
		
		rowIndex = rowIndex + 1;
	}
	
	return visitRes;
}


// Update adjacent nodes for current iteration.
function evaluateAdjacentNodes(baseID, baseDist, possibleEdges, dsktraInfo, edgeArray)
{
	var adjacentIndex = 0;
	var currentEdgeID = -1;
	var currentEdgeObject = {};
	var currentNodeID = -1;
	var currentNodeObject = {};
	var currentOldDist = -1;
	var currentNewDist = -1;
	
	// Loop through marked edges with a possible destination.
	for (adjacentIndex = 0; adjacentIndex < possibleEdges.length; adjacentIndex = adjacentIndex + 1)
	{
		// Read current edge.
		currentEdgeID = possibleEdges[adjacentIndex];
		currentEdgeObject = edgeArray[currentEdgeID];
		
		// Read destination node.
		currentNodeID = currentEdgeObject.destination;
		currentNodeObject = dsktraInfo.nodes[currentNodeID];
		
		// Calculate new distance.
		currentOldDist = currentNodeObject.distanceFromStart;
		currentNewDist = baseDist + currentEdgeObject.distance;
		currentUpdate = false;
		
		
		if (currentNewDist < currentOldDist)
		{
			// Update node.
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