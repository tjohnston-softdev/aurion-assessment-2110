function defineSingleNodeObject(inpNode, graphNodes)
{
	var defineRes = {};
	defineRes["targetNode"] = graphNodes.indexOf(inpNode);
	return defineRes;
}


function defineMultipleNodesObject(inpNodeList, graphNodes)
{
	var itemIndex = 0;
	var currentItem = null;
	var currentNodeIndex = -1;
	var currentUsed = false;
	
	var defineRes = {};
	defineRes["targetList"] = [];
	
	for (itemIndex = 0; itemIndex < inpNodeList.length; itemIndex = itemIndex + 1)
	{
		currentItem = inpNodeList[itemIndex];
		currentNodeIndex = graphNodes.indexOf(currentItem);
		currentUsed = defineRes.targetList.includes(currentNodeIndex);
		
		if (currentNodeIndex >= 0 && currentNodeIndex < graphNodes.length && currentUsed !== true)
		{
			defineRes.targetList.push(currentNodeIndex);
		}
	}
	
	return defineRes;
}



module.exports =
{
	defineSingleNode: defineSingleNodeObject,
	defineMultipleNodes: defineMultipleNodesObject
};