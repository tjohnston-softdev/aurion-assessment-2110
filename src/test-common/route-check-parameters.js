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
	return {"numberValue": inpNum}
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
	var mapRes = [];
	
	// Loop node characters.
	for (var itemIndex = 0; itemIndex < inputNodes.length; itemIndex++)
	{
		// Convert node character to ID.
		var currentItem = inputNodes[itemIndex];
		var currentNodeIndex = graphNodes.indexOf(currentItem);
		
		// Check if node already used.
		var currentUsed = mapRes.includes(currentNodeIndex);
		
		
		if (currentNodeIndex >= 0 && currentNodeIndex < graphNodes.length && !currentUsed)
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