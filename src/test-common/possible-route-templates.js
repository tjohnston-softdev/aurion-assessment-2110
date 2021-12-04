const testScenarios = require("../common/enum/possible-route-tests");


function checkResultObject(pathResObj, nodeListObj, scenarioFlag)
{
	var entryIndex = 0;
	var currentEntry = null;
	var currentMatch = false;
	
	var canContinue = true;
	
	while (entryIndex >= 0 && entryIndex < pathResObj.length && canContinue === true)
	{
		currentEntry = pathResObj[entryIndex];
		currentMatch = true;
		
		if (scenarioFlag === testScenarios.TEMPLATE_EXACT)
		{
			currentMatch = followExact(currentEntry.route.steps, nodeListObj);
		}
		else if (scenarioFlag === testScenarios.TEMPLATE_WILDCARD)
		{
			currentMatch = followWildcard(currentEntry.route.steps, nodeListObj);
		}
		else if (scenarioFlag === testScenarios.TEMPLATE_SEQ_ONCE)
		{
			currentMatch = followSequence(currentEntry.route.steps, nodeListObj, "AEB", false);
		}
		else if (scenarioFlag === testScenarios.TEMPLATE_SEQ_REPEAT)
		{
			currentMatch = followSequence(currentEntry.route.steps, nodeListObj, "EAC", true);
		}
		
		if (currentMatch !== true)
		{
			console.log(currentEntry.route.steps);
			canContinue = false;
			throw new Error("Retrieved route does not match template");
		}
		
		entryIndex = entryIndex + 1;
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
			currentVisitChar = nodeArr[currentVisitID];
		}
		
		
		if (currentTargetNode === ".")
		{
			currentValid = true;
		}
		else if (currentVisitChar === currentTargetNode)
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


function followSequence(stepArr, nodeArr, seqString, useGlobal)
{
	var startNode = seqString.charAt(0);
	
	var stepIndex = 0;
	var currentVisitID = -1;
	var currentVisitChar = "";
	var currentSequenceNode = null;
	var currentMatch = false;
	
	var sequenceIndex = -1;
	var sequenceFound = false;
	var canStep = true;
	
	while (stepIndex >= 0 && stepIndex < stepArr.length && sequenceFound !== true && canStep === true)
	{
		currentVisitID = stepArr[stepIndex];
		currentVisitChar = nodeArr[currentVisitID];
		currentSequenceNode = null;
		currentMatch = false;
		
		if (currentVisitChar === startNode)
		{
			sequenceIndex = 1;
		}
		else if (sequenceIndex >= 0 && sequenceIndex < seqString.length)
		{
			currentSequenceNode = seqString.charAt(sequenceIndex);
			currentMatch = (currentVisitChar === currentSequenceNode);
			sequenceIndex = updateSequenceProgression(currentMatch, sequenceIndex);
		}
		else if (sequenceIndex >= seqString.length)
		{
			sequenceIndex = -1;
			sequenceFound = true;
			canStep = useGlobal;
		}
		
		stepIndex = stepIndex + 1;
	}
	
	if (sequenceIndex >= seqString.length)
	{
		sequenceFound = true;
	}
	
	return sequenceFound;
}


function updateSequenceProgression(nodesMatch, seqInd)
{
	var newValue = -1;
	
	if (nodesMatch === true)
	{
		newValue = seqInd + 1;
	}
	
	return newValue;
}


module.exports =
{
	checkObject: checkResultObject
};