// This script follows an exact route in the graph.

const graphTasks = require("./common/graph-tasks");

// Main function.
function getRouteDistance(inputGraphObject, pathString)
{
	var argValid = (typeof pathString === "string");
	var resultValue = null;
	
	if (argValid === true && pathString.length >= 2)
	{
		// Follow path.
		resultValue = loopSteps(inputGraphObject, pathString);
	}
	else if (argValid === true)
	{
		// Too short.
		resultValue = "PATH MUST HAVE AT LEAST TWO NODES";
	}
	else
	{
		// Invalid type.
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
	
	var currentOriginChar = "";
	var currentDestChar = "";
	var currentOriginID = -1;
	var currentDestID = -1;
	var currentEdge = null;
	
	var totalDistance = 0;
	var canContinue = true;
	var loopResult = null;
	
	// Loop route characters as: 0-1, 1-2, etc
	while (loopIndex >= 0 && loopIndex < loopCutoff && canContinue === true)
	{
		// Read route nodes.
		offsetIndex = loopIndex + 1;
		currentOriginChar = stepStr.charAt(loopIndex);
		currentDestChar = stepStr.charAt(offsetIndex);
		currentOriginID = graphObject.nodes.indexOf(currentOriginChar);
		currentDestID = graphObject.nodes.indexOf(currentDestChar);
		
		// Retrieve corresponding edge.
		currentEdge = graphTasks.getEdge(currentOriginID, currentDestID, graphObject.edges);
		
		
		if (currentEdge !== null)
		{
			// Valid step - Increment distance.
			totalDistance += currentEdge.distance;
		}
		else
		{
			// Invalid step - Abort loop.
			canContinue = false;
		}
		
		// Continue onto next step.
		loopIndex = loopIndex + 1;
	}
	
	
	// Check if route successful.
	if (canContinue === true)
	{
		// Return total distance.
		loopResult = totalDistance;
	}
	else
	{
		// Return message.
		loopResult = graphTasks.getNoRouteText();
	}
	
	
	return loopResult;
}




module.exports =
{
	getDistance: getRouteDistance
};