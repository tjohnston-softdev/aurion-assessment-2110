// Parameter objects for 'possible routes' result testing.


// Start,End constructor.
function defineStartEndObject(inpStartNodes, inpEndNodes, inpGraphNodes)
{
	var defineRes = {};
	
	defineRes["start"] = mapNodes(inpStartNodes, inpGraphNodes);
	defineRes["end"] = mapNodes(inpEndNodes, inpGraphNodes);
	
	return defineRes;
}


// Single number constructor.
function defineNumberObject(inpNum)
{
	var defineRes = {"numberValue": inpNum}
	return defineRes;
}

// Range constructor.
function defineRangeObject(inpLower, inpUpper)
{
	var defineRes = {"min": inpLower, "max": inpUpper};
	
	// Swap numbers if required.
	if (inpLower > inpUpper || inpUpper < inpLower)
	{
		defineRes.min = inpUpper;
		defineRes.max = inpLower;
	}
	
	return defineRes;
}



// Converts string of node characters into ID array.
function mapNodes(inputNodes, graphNodes)
{
	var itemIndex = 0;
	var currentItem = null;
	var currentNodeIndex = -1;
	var currentUsed = false;
	
	var mapRes = [];
	
	
	// Loop node characters.
	for (itemIndex = 0; itemIndex < inputNodes.length; itemIndex = itemIndex + 1)
	{
		// Convert node character to ID.
		currentItem = inputNodes[itemIndex];
		currentNodeIndex = graphNodes.indexOf(currentItem);
		
		// Check if node already used.
		currentUsed = mapRes.includes(currentNodeIndex);
		
		
		if (currentNodeIndex >= 0 && currentNodeIndex < graphNodes.length && currentUsed !== true)
		{
			// Add to set.
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