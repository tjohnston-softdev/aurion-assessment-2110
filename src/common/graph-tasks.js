// Common graph functions.

// Graph object.
function defineGraphObject()
{
	var defineRes = {};
	
	defineRes["nodes"] = [];				// Node array.
	defineRes["edges"] = [];				// Edge array.
	defineRes["valid"] = false;				// Parse valid.
	
	return defineRes;
}


// Add or retrieve graph node.
function addNodeDefinition(tgtChar, nodeArray)
{
	var matchIndex = nodeArray.indexOf(tgtChar);
	var resultID = -1;
	
	if (matchIndex >= 0 && matchIndex < nodeArray.length)
	{
		// Already exists.
		resultID = matchIndex;
	}
	else
	{
		// Add to graph.
		nodeArray.push(tgtChar);
		resultID = nodeArray.length - 1;
	}
	
	return resultID;
}


// Add edge between nodes.
function addEdgeObject(originID, destID, distNum, edgeArray)
{
	var newEdge = {};
	
	// Nodes cannot be the same.
	if (originID !== destID)
	{
		newEdge["origin"] = originID;
		newEdge["destination"] = destID;
		newEdge["distance"] = distNum;
		
		edgeArray.push(newEdge);
	}
}


// 'No Such Route' output string.
function getNoRouteTextString()
{
	return "NO SUCH ROUTE";
}


// Search for existing graph edge.
function getExistingEdge(tgtOrigin, tgtDest, edgeArray)
{
	var existIndex = 0;
	var currentObject = {};
	var edgeRes = null;
	
	while (existIndex >= 0 && existIndex < edgeArray.length && edgeRes === null)
	{
		currentObject = edgeArray[existIndex];
		
		// Origin and destination nodes must match exactly.
		if (currentObject.origin === tgtOrigin && currentObject.destination === tgtDest)
		{
			// Match found, return edge object.
			edgeRes = currentObject;
		}
		
		existIndex = existIndex + 1;
	}
	
	return edgeRes;
}


// Get possible destination edges from origin node.
function getAdjacentEdgesByNode(tgtOrigin, edgeArray)
{
	var edgeIndex = 0;
	var currentObject = {};
	var adjacentRes = [];
	
	for (edgeIndex = 0; edgeIndex < edgeArray.length; edgeIndex = edgeIndex + 1)
	{
		currentObject = edgeArray[edgeIndex];
		
		if (currentObject.origin === tgtOrigin)
		{
			// Add edge index to result list.
			adjacentRes.push(edgeIndex);
		}
	}
	
	return adjacentRes;
}



module.exports =
{
	defineGraph: defineGraphObject,
	addNode: addNodeDefinition,
	addEdge: addEdgeObject,
	getNoRouteText: getNoRouteTextString,
	getEdge: getExistingEdge,
	getAdjacentEdges: getAdjacentEdgesByNode
};