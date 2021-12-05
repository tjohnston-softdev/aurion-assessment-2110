/*
	Checks if retrieved routes match a given template.
	Takes place after base result validation.
*/

const testScenarios = require("../common/enum/possible-route-tests");

// Main function.
function checkResultObject(pathResObj, nodeListObj, scenarioFlag)
{
	var entryIndex = 0;
	var currentEntry = null;
	var currentMatch = false;
	
	var canContinue = true;
	
	// Loop routes until complete, or error found.
	while (entryIndex >= 0 && entryIndex < pathResObj.length && canContinue === true)
	{
		// Read current route.
		currentEntry = pathResObj[entryIndex];
		currentMatch = true;
		
		if (scenarioFlag === testScenarios.TEMPLATE_EXACT)
		{
			// Exact
			currentMatch = followExact(currentEntry.route.steps, nodeListObj);
		}
		else if (scenarioFlag === testScenarios.TEMPLATE_WILDCARD)
		{
			// Wildcard
			currentMatch = followWildcard(currentEntry.route.steps, nodeListObj);
		}
		else if (scenarioFlag === testScenarios.TEMPLATE_SEQUENCE)
		{
			// Sequence
			currentMatch = followSequence(currentEntry.route.steps, nodeListObj);
		}
		else if (scenarioFlag === testScenarios.TEMPLATE_CHOICE)
		{
			// Choice
			currentMatch = followChoice(currentEntry.route.steps, nodeListObj);
		}
		else if (scenarioFlag === testScenarios.TEMPLATE_INVERT)
		{
			// Invert
			currentMatch = followInvert(currentEntry.route.steps, nodeListObj);
		}
		else if (scenarioFlag === testScenarios.TEMPLATE_CHAR_GRPS)
		{
			// Character groups
			currentMatch = followCharacterGroups(currentEntry.route.steps, nodeListObj);
		}
		else if (scenarioFlag === testScenarios.TEMPLATE_NEST)
		{
			// Nesting
			currentMatch = followNesting(currentEntry.route.steps, nodeListObj);
		}
		
		
		if (currentMatch !== true)
		{
			// Route does not match.
			canContinue = false;
			throw new Error("Retrieved route does not match template");
		}
		
		
		entryIndex = entryIndex + 1;
	}
	
}


// Follows 'Exact' template.
function followExact(stepArr, nodeArr)
{
	var routeString = "AEBFD";
	
	var loopIndex = 0;
	var currentTargetNode = "";
	var currentVisitID = -1;
	var currentVisitChar = "";
	
	var matchSuccessful = true;
	
	// Traverse sequence in loop.
	while (loopIndex >= 0 && loopIndex < routeString.length && matchSuccessful === true)
	{
		// Reads current target node.
		currentTargetNode = routeString.charAt(loopIndex);
		currentVisitID = -1;
		currentVisitChar = "";
		
		if (loopIndex >= 0 && loopIndex < stepArr.length)
		{
			// Step exists, retrieve corresponding node.
			currentVisitID = stepArr[loopIndex];
			currentVisitChar = nodeArr[currentVisitID];
		}
		
		if (currentVisitChar !== currentTargetNode)
		{
			// Nodes match.
			matchSuccessful = false;
		}
		
		loopIndex = loopIndex + 1;
	}
	
	
	return matchSuccessful;
}


// Follows 'Wildcard' template.
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
	
	// Traverse sequence in loop.
	while (loopIndex >= 0 && loopIndex < routeString.length && matchSuccessful === true)
	{
		// Reads step index and target node.
		currentStep = (stepArr.length - 4) + loopIndex;
		currentTargetNode = routeString.charAt(loopIndex);
		currentVisitID = -1;
		currentVisitChar = null;
		currentValid = false;
		
		
		if (currentStep >= 0 && currentStep < stepArr.length)
		{
			// Step exists, read corresponding node.
			currentVisitID = stepArr[currentStep];
			currentVisitChar = nodeArr[currentVisitID];
		}
		
		
		if (currentTargetNode === ".")
		{
			// Wildcard
			currentValid = true;
		}
		else if (currentVisitChar === currentTargetNode)
		{
			// Matching node
			currentValid = true;
		}
		else
		{
			// Invalid
			matchSuccessful = false;
		}
		
		loopIndex = loopIndex + 1;
	}
	
	return matchSuccessful;
}


// Follows 'Sequence' template.
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
	
	
	// Traverse route
	for (stepIndex = 0; stepIndex < stepArr.length; stepIndex = stepIndex + 1)
	{
		// Read current node.
		currentVisitID = stepArr[stepIndex];
		currentVisitChar = nodeArr[currentVisitID];
		currentSequenceNode = null;
		currentMatch = false;
		
		if (currentVisitChar === startNode)
		{
			// Begin sequence
			sequenceIndex = 1;
		}
		else if (sequenceIndex >= 0 && sequenceIndex < seqString.length)
		{
			// Continue sequence - Check if node matches target.
			currentSequenceNode = seqString.charAt(sequenceIndex);
			currentMatch = (currentVisitChar === currentSequenceNode);
			sequenceIndex = updateSequenceProgression(currentMatch, sequenceIndex);
		}
		else if (sequenceIndex >= seqString.length)
		{
			// Sequence complete
			sequenceIndex = -1;
			sequenceFound = true;
		}
	}
	
	
	if (sequenceIndex >= seqString.length)
	{
		// Sequence ends with route.
		sequenceFound = true;
	}
	
	return sequenceFound;
}


// Follows 'Choice' template.
function followChoice(stepArr, nodeArr)
{
	// Third node must be from set.
	var allowedNodes = ["A", "B", "C"];
	var visitID = stepArr[2];
	var visitChar = nodeArr[visitID];
	var matchSuccessful = allowedNodes.includes(visitChar);
	
	return matchSuccessful;
}


// Follows 'Invert' template.
function followInvert(stepArr, nodeArr)
{
	// Second and fourth nodes must not be marked.
	
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


// Follows 'Character Groups' template.
function followCharacterGroups(stepArr, nodeArr)
{
	// Second and fourth nodes must be possible start and end nodes.
	
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


// Follows 'Nest' template.
function followNesting(stepArr, nodeArr)
{
	// Alternates between A and C from second node onwards.
	
	var stepIndex = 1;
	var currentAlternateFlag = -1;
	var currentNodeID = -1;
	var currentNodeChar = "";
	var currentValid = false;
	
	var matchSuccessful = true;
	
	// Traverse route from second node until end reached or error found.
	while (stepIndex > 0 && stepIndex < stepArr.length && matchSuccessful === true)
	{
		// Reads current node.
		currentAlternateFlag = stepIndex % 2;
		currentNodeID = stepArr[stepIndex];
		currentNodeChar = nodeArr[currentNodeID];
		currentValid = false;
		
		if (currentAlternateFlag === 1 && currentNodeChar === "A")
		{
			// Valid
			currentValid = true;
		}
		else if (currentAlternateFlag === 0 && currentNodeChar === "C")
		{
			// Valid
			currentValid = true;
		}
		else
		{
			// Invalid
			matchSuccessful = false;
		}
		
		stepIndex = stepIndex + 1;
	}
	
	return matchSuccessful;
}


// Follow 'Integration' template.
function followIntegration(stepArr, nodeArr)
{
	// Third node must be from allowed set.
	
	var allowedNodes = ["A", "B", "C", "D"];
	var choiceID = stepArr[2];
	var choiceChar = nodeArr[choiceID];
	var matchSuccessful = allowedNodes.includes(choiceChar);
	return matchSuccessful;
}


// Increments sequence step indes for the 'Sequence' template.
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