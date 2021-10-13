function defineGraphObject()
{
	var defineRes = {};
	
	defineRes["nodes"] = [];
	defineRes["edges"] = [];
	defineRes["valid"] = false;
	
	return defineRes;
}


function addNodeDefinition(tgtChar, nodeArray)
{
	var matchIndex = nodeArray.indexOf(tgtChar);
	var resultID = -1;
	
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
	
	newEdge["origin"] = originID;
	newEdge["destination"] = destID;
	newEdge["distance"] = distNum;
	
	edgeArray.push(newEdge);
}


function getExistingEdge(tgtOrigin, tgtDest, edgeArray)
{
	var existIndex = 0;
	var currentObject = {};
	var edgeRes = null;
	
	while (existIndex >= 0 && existIndex < edgeArray.length && edgeRes === null)
	{
		currentObject = edgeArray[existIndex];
		
		if (currentObject.origin === tgtOrigin && currentObject.destination === tgtDest)
		{
			edgeRes = currentObject;
		}
		
		existIndex = existIndex + 1;
	}
	
	return edgeRes;
}



module.exports =
{
	defineGraph: defineGraphObject,
	addNode: addNodeDefinition,
	addEdge: addEdgeObject,
	getEdge: getExistingEdge
};