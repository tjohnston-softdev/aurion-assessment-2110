function defineSingleNodeObject(inpNode, inpGraphNodes)
{
	var defineRes = {};
	defineRes["targetNode"] = inpGraphNodes.indexOf(inpNode);
	return defineRes;
}


function defineMultipleNodesObject(inpNodeList, inpGraphNodes)
{
	var defineRes = {};
	defineRes["targetList"] = mapNodes(inpNodeList, inpGraphNodes);
	return defineRes;
}

function defineRouteTypeObject(inpStartNodes, inpEndNodes, inpGraphNodes)
{
	var defineRes = {};
	
	defineRes["start"] = mapNodes(inpStartNodes, inpGraphNodes);
	defineRes["end"] = mapNodes(inpEndNodes, inpGraphNodes);
	
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
	defineSingleNode: defineSingleNodeObject,
	defineMultipleNodes: defineMultipleNodesObject,
	defineRouteType: defineRouteTypeObject
};