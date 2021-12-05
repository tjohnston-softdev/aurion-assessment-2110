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
		else if (scenarioFlag === testScenarios.TEMPLATE_SEQUENCE)
		{
			currentMatch = followSequence(currentEntry.route.steps, nodeListObj);
		}
		else if (scenarioFlag === testScenarios.TEMPLATE_CHOICE)
		{
			currentMatch = followChoice(currentEntry.route.steps, nodeListObj);
		}
		else if (scenarioFlag === testScenarios.TEMPLATE_INVERT)
		{
			currentMatch = followInvert(currentEntry.route.steps, nodeListObj);
		}
		else if (scenarioFlag === testScenarios.TEMPLATE_CHAR_GRPS)
		{
			currentMatch = followCharacterGroups(currentEntry.route.steps, nodeListObj);
		}
		else if (scenarioFlag === testScenarios.TEMPLATE_NEST)
		{
			currentMatch = followNesting(currentEntry.route.steps, nodeListObj);
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


function followSequence(stepArr, nodeArr)
{
	var seqString = "EAC";
	var startNode = seqString.charAt(0);
	
	var stepIndex = 0;
	var currentVisitID = -1;
	var currentVisitChar = "";
	var currentSequenceNode = null;
	var currentMatch = false;
	
	var sequenceIndex = -1;
	var sequenceFound = false;
	
	for (stepIndex = 0; stepIndex < stepArr.length; stepIndex = stepIndex + 1)
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
		}
	}
	
	if (sequenceIndex >= seqString.length)
	{
		sequenceFound = true;
	}
	
	return sequenceFound;
}


function followChoice(stepArr, nodeArr)
{
	var allowedNodes = ["A", "B", "C"];
	var visitID = stepArr[2];
	var visitChar = nodeArr[visitID];
	var matchSuccessful = allowedNodes.includes(visitChar);
	
	return matchSuccessful;
}


function followInvert(stepArr, nodeArr)
{
	var firstAvoid = ["A", "B"];
	var secondAvoid = ["D", "E"];
	
	var firstID = stepArr[1];
	var firstChar = nodeArr[firstID];
	
	var secondID = stepArr[3];
	var secondChar = nodeArr[secondID];
	
	var firstIncl = firstAvoid.includes(firstChar);
	var secondIncl = secondAvoid.includes(secondChar);
	
	var matchSuccessful = (firstIncl !== true && secondIncl !== true);
	return matchSuccessful;
}


function followCharacterGroups(stepArr, nodeArr)
{
	var allowedStart = ["A", "B", "C"];
	var allowedEnd = ["D", "E", "F"];
	
	var startGroupID = stepArr[1];
	var startGroupChar = nodeArr[startGroupID];
	
	var endGroupID = stepArr[3];
	var endGroupChar = nodeArr[endGroupID];
	
	var startMatch = allowedStart.includes(startGroupChar);
	var endMatch = allowedEnd.includes(endGroupChar);
	
	var matchSuccessful = (startMatch === true && endMatch === true);
	return matchSuccessful;
}


function followNesting(stepArr, nodeArr)
{
	var stepIndex = 1;
	var currentAlternateFlag = -1;
	var currentNodeID = -1;
	var currentNodeChar = "";
	var currentValid = false;
	
	var matchSuccessful = true;
	
	while (stepIndex > 0 && stepIndex < stepArr.length && matchSuccessful === true)
	{
		currentAlternateFlag = stepIndex % 2;
		currentNodeID = stepArr[stepIndex];
		currentNodeChar = nodeArr[currentNodeID];
		currentValid = false;
		
		if (currentAlternateFlag === 1 && currentNodeChar === "A")
		{
			currentValid = true;
		}
		else if (currentAlternateFlag === 0 && currentNodeChar === "C")
		{
			currentValid = true;
		}
		else
		{
			matchSuccessful = false;
		}
		
		stepIndex = stepIndex + 1;
	}
	
	return matchSuccessful;
}


function followIntegration(stepArr, nodeArr)
{
	var allowedNodes = ["A", "B", "C", "D"];
	var choiceID = stepArr[2];
	var choiceChar = nodeArr[choiceID];
	var matchSuccessful = allowedNodes.includes(choiceChar);
	return matchSuccessful;
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