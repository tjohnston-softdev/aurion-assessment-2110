function defineStartEndObject(inpStartNodes, inpEndNodes, inpGraphNodes)
{
	var defineRes = {};
	
	defineRes["start"] = mapNodes(inpStartNodes, inpGraphNodes);
	defineRes["end"] = mapNodes(inpEndNodes, inpGraphNodes);
	
	return defineRes;
}


function defineNumberObject(inpNum)
{
	var defineRes = {"numberValue": inpNum}
	return defineRes;
}


function defineRangeObject(inpLower, inpUpper)
{
	var defineRes = {"min": inpLower, "max": inpUpper};
	
	if (inpLower > inpUpper || inpUpper < inpLower)
	{
		defineRes.min = inpUpper;
		defineRes.max = inpLower;
	}
	
	return defineRes;
}




function mapNodes(inputNodes, graphNodes)
{
	var itemIndex = 0;
	var currentItem = null;
	var currentNodeIndex = -1;
	var currentUsed = false;
	
	var mapRes = [];
	
	for (itemIndex = 0; itemIndex < inputNodes.length; itemIndex = itemIndex + 1)
	{
		currentItem = inputNodes[itemIndex];
		currentNodeIndex = graphNodes.indexOf(currentItem);
		currentUsed = mapRes.includes(currentNodeIndex);
		
		if (currentNodeIndex >= 0 && currentNodeIndex < graphNodes.length && currentUsed !== true)
		{
			mapRes.push(currentNodeIndex);
		}
	}
	
	return mapRes;
}



module.exports =
{
	defineStartEnd: defineStartEndObject,
	defineNumber: defineNumberObject,
	defineRange: defineRangeObject
};