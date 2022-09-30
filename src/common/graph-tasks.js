// Common graph functions.


function defineGraphObject()
{
	return {nodes: [], edges: [], valid: false};
}


function addNodeDefinition(tgtChar, nodeArray)
{
	var matchIndex = nodeArray.indexOf(tgtChar);
	var resultID;
	
	if (matchIndex >= 0 && matchIndex < nodeArray.length)
	{
		resultID = matchIndex;
	}
	else
	{
		nodeArray.push(tgtChar);
		resultID = nodeArray.length - 1;
	}
	
	return resultID;
}


function addEdgeObject(originID, destID, distNum, edgeArray)
{
	var newEdge = {};
	
	// Nodes cannot be the same.
	if (originID !== destID)
	{
		var newEdge = {origin: originID, destination: destID, distance: distNum};
		edgeArray.push(newEdge);
	}
}


function getNoRouteTextString()
{
	return "NO SUCH ROUTE";
}


function getExistingEdge(tgtOrigin, tgtDest, edgeArray)
{
	var existIndex = 0;
	var edgeRes = null;
	
	while (existIndex >= 0 && existIndex < edgeArray.length && edgeRes === null)
	{
		var currentObject = edgeArray[existIndex];
		
		// Origin and destination nodes must match exactly.
		if (currentObject.origin === tgtOrigin && currentObject.destination === tgtDest)
		{
			edgeRes = currentObject;
		}
		
		existIndex += 1;
	}
	
	return edgeRes;
}



function getAdjacentEdgesByNode(tgtOrigin, edgeArray)
{
	var adjacentRes = [];
	
	for (var edgeIndex = 0; edgeIndex < edgeArray.length; edgeIndex++)
	{
		var currentObject = edgeArray[edgeIndex];
		
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