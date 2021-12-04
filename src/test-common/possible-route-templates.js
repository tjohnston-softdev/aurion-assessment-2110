const testScenarios = require("../common/enum/possible-route-tests");


function checkResultObject(pathResObj, nodeListObj, scenarioFlag)
{
	var entryIndex = 0;
	var currentEntry = null;
	var currentMatch = false;
	
	var canContinue = true;
	
	for (entryIndex >= 0 && entryIndex < pathResObj.length && canContinue === true)
	{
		currentEntry = pathResObj[entryIndex];
		currentMatch = true;
		
		if (scenarioFlag === testScenarios.TEMPLATE_EXACT)
		{
			currentMatch = currentMatch = followExact(currentEntry.route.steps, nodeListObj);
		}
		else if (scenarioFlag === testScenarios.TEMPLATE_WILDCARD)
		{
			currentMatch = currentMatch = followWildcard(currentEntry.route.steps, nodeListObj);
		}
		
		if (currentMatch !== true)
		{
			canContinue = false;
			throw new Error("Retrieved route does not match template");
		}
		
	}
	
}


function followExact(stepArr, nodeArr)
{
	var routeString = "AEBFD";
	
	var loopIndex = 0;
	var currentTargetNode = "";
	var currentVisitID = -1;
	var currentVisitChar = "";
	
	var matchSuccessful = true;
	
	while (loopIndex >= 0 && loopIndex < routeString.length && matchSuccessful === true)
	{
		currentTargetNode = routeString.charAt(loopIndex);
		currentVisitID = -1;
		currentVisitChar = "";
		
		if (loopIndex >= 0 && loopIndex < stepArr.length)
		{
			currentVisitID = stepArr[loopIndex];
		}
		
		if (currentVisitID >= 0 && currentVisitID <= nodeArr.length)
		{
			currentVisitChar = nodeArr[currentVisitID];
		}
		
		if (currentVisitChar !== currentTargetNode)
		{
			matchSuccessful = false;
		}
		
		loopIndex = loopIndex + 1;
	}
	
	
	return matchSuccessful;
}


function followWildcard(stepArr, nodeArr)
{
	var routeString = "A..C";
	
	var loopIndex = 0;
	var currentStep = -1;
	var currentTargetNode = "";
	var currentVisitID = -1;
	var currentVisitChar = null;
	var currentValid = false;
	
	var matchSuccessful = true;
	
	while (loopIndex >= 0 && loopIndex < routeString.length && matchSuccessful === true)
	{
		currentStep = (stepArr.length - 4) + loopIndex;
		currentTargetNode = routeString.charAt(loopIndex);
		currentVisitID = -1;
		currentVisitChar = null;
		currentValid = false;
		
		if (currentStep >= 0 && currentStep < stepArr.length)
		{
			currentVisitID = stepArr[currentStep];
		}
		
		if (currentVisitID >= 0 && currentVisitID < nodeArr.length)
		{
			currentVisitChar = nodeArr[currentVisitID];
		}
		
		
		if (currentVisitChar !== null && currentTargetNode === ".")
		{
			currentValid = true;
		}
		else if (currentVisitChar !== null && currentVisitChar === currentTargetNode)
		{
			currentValid = true;
		}
		else
		{
			matchSuccessful = false;
		}
		
		loopIndex = loopIndex + 1;
	}
	
	return matchSuccessful;
}


module.exports =
{
	checkObject: checkResultObject
};