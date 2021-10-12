function getExistingEdge(tgtOrigin, tgtDest, edgeArray)
{
	var existIndex = 0;
	var currentObject = {};
	var edgeRes = null;
	
	while (existIndex >= 0 && existIndex < edgeArray.length && edgeRes !== null)
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
	getEdge: getExistingEdge
};