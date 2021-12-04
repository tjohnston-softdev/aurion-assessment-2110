function followExactTemplate(pathResObj, nodeListObj)
{
	var routeString = "AEBFD";
	var routeObject = pathResObj[0];
	
	var loopIndex = 0;
	var currentTargetNode = "";
	var currentVisitNodeID = -1;
	var currentVisitNodeChar = "";
	
	var matchSuccessful = true;
	
	while (loopIndex >= 0 && loopIndex < routeString.length && matchSuccessful === true)
	{
		currentTargetNode = routeString.charAt(loopIndex);
		currentVisitNodeID = -1;
		currentVisitNodeChar = "";
		
		if (loopIndex >= 0 && loopIndex < routeObject.route.steps.length)
		{
			currentVisitNodeID = routeObject.route.steps[loopIndex];
		}
		
		if (currentVisitNodeID >= 0 && currentVisitNodeID <= nodeListObj.length)
		{
			currentVisitNodeChar = nodeListObj[currentVisitNodeID];
		}
		
		if (currentVisitNodeChar !== currentTargetNode)
		{
			matchSuccessful = false;
			throw new Error("Retrieved route does not match exact template.");
		}
		
		loopIndex = loopIndex + 1;
	}
	
}


module.exports =
{
	followExact: followExactTemplate
};