const graphTasks = require("./common/graph-tasks");


function getRouteDistance(graphObject, pathString)
{
	var argValid = (typeof pathString === "string");
	var resultValue = null;
	
	if (argValid === true && pathString.length >= 2)
	{
		resultValue = loopSteps(graphObject, pathString);
	}
	else if (argValid === true)
	{
		resultValue = "PATH MUST HAVE AT LEAST TWO NODES";
	}
	else
	{
		resultValue = "PATH MUST BE A VALID ARRAY";
	}
	
	return resultValue;
}



function loopSteps(graphObj, stepStr)
{
	var loopIndex = 0;
	var offsetIndex = 1;
	var loopCutoff = stepStr.length - 1;
	
	var currentOriginChar = "";
	var currentDestChar = "";
	var currentOriginID = -1;
	var currentDestID = -1;
	var currentEdge = null;
	
	var totalDistance = 0;
	var canContinue = true;
	var loopResult = null;
	
	while (loopIndex >= 0 && loopIndex < loopCutoff && canContinue === true)
	{
		offsetIndex = loopIndex + 1;
		currentOriginChar = stepStr.charAt(loopIndex);
		currentDestChar = stepStr.charAt(offsetIndex);
		currentOriginID = graphObj.nodes.indexOf(currentOriginChar);
		currentDestID = graphObj.nodes.indexOf(currentDestChar);
		currentEdge = graphTasks.getEdge(currentOriginID, currentDestID, graphObj.edges);
		
		if (currentEdge !== null)
		{
			totalDistance += currentEdge.distance;
		}
		else
		{
			canContinue = false;
		}
		
		loopIndex = loopIndex + 1;
	}
	
	
	if (canContinue === true)
	{
		loopResult = totalDistance;
	}
	else
	{
		loopResult = "NO SUCH ROUTE";
	}
	
	
	return loopResult;
}




module.exports =
{
	getDistance: getRouteDistance
};