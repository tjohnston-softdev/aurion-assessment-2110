// This script follows an exact route in the graph.

const graphTasks = require("./common/graph-tasks");

// Main function.
function getRouteDistance(inputGraphObject, pathString)
{
	var argValid = (typeof pathString === "string");
	var resultValue = null;
	
	if (argValid && pathString.length >= 2)
	{
		resultValue = loopSteps(inputGraphObject, pathString);
	}
	else if (argValid)
	{
		resultValue = "PATH MUST HAVE AT LEAST TWO NODES";
	}
	else
	{
		resultValue = "PATH MUST BE A VALID STRING";
	}
	
	return resultValue;
}


// Follow the given route step-by-step.
function loopSteps(graphObject, stepStr)
{
	var loopIndex = 0;
	var offsetIndex = 1;
	var loopCutoff = stepStr.length - 1;
	
	var totalDistance = 0;
	var canContinue = true;
	
	// Loop route characters as: 0-1, 1-2, etc
	while (loopIndex >= 0 && loopIndex < loopCutoff && canContinue)
	{
		// Read route nodes.
		offsetIndex = loopIndex + 1;
		var currentOriginChar = stepStr.charAt(loopIndex);
		var currentDestChar = stepStr.charAt(offsetIndex);
		var currentOriginID = graphObject.nodes.indexOf(currentOriginChar);
		var currentDestID = graphObject.nodes.indexOf(currentDestChar);
		
		// Retrieve corresponding edge.
		var currentEdge = graphTasks.getEdge(currentOriginID, currentDestID, graphObject.edges);
		
		
		if (currentEdge !== null) totalDistance += currentEdge.distance;
		else canContinue = false;
		
		// Continue onto next step.
		loopIndex += 1;
	}
	
	return canContinue ? totalDistance : graphTasks.getNoRouteText();
}




module.exports =
{
	getDistance: getRouteDistance
};