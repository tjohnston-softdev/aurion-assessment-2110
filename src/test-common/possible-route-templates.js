/*
	Checks if retrieved routes match a given template.
	Takes place after base result validation.
*/

const testScenarios = require("../common/enum/possible-route-tests");

// Main function.
function checkResultObject(pathResObj, nodeListObj, scenarioFlag)
{
	var entryIndex = 0;
	
	var canContinue = true;
	
	// Loop routes until complete, or error found.
	while (entryIndex >= 0 && entryIndex < pathResObj.length && canContinue)
	{
		// Read current route.
		var currentEntry = pathResObj[entryIndex];
		var currentMatch = true;
		
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
		
		
		if (!currentMatch)
		{
			// Route does not match.
			canContinue = false;
			throw new Error("Retrieved route does not match template");
		}
		
		
		entryIndex += 1;
	}
	
}


// Follows 'Exact' template.
function followExact(stepArr, nodeArr)
{
	var routeString = "AEBFD";
	var loopIndex = 0;
	var matchSuccessful = true;
	
	// Traverse sequence in loop.
	while (loopIndex >= 0 && loopIndex < routeString.length && matchSuccessful === true)
	{
		// Reads current target node.
		var currentTargetNode = routeString.charAt(loopIndex);
		var currentVisitID = -1;
		var currentVisitChar = "";
		
		if (loopIndex >= 0 && loopIndex < stepArr.length)
		{
			// Step exists, retrieve corresponding node.
			currentVisitID = stepArr[loopIndex];
			currentVisitChar = nodeArr[currentVisitID];
		}
		
		if (currentVisitChar !== currentTargetNode) matchSuccessful = false;
		
		loopIndex = loopIndex + 1;
	}
	
	
	return matchSuccessful;
}


// Follows 'Wildcard' template.
function followWildcard(stepArr, nodeArr)
{
	var routeString = "A..C";
	var loopIndex = 0;
	var matchSuccessful = true;
	
	// Traverse sequence in loop.
	while (loopIndex >= 0 && loopIndex < routeString.length && matchSuccessful)
	{
		// Reads step index and target node.
		var currentStep = (stepArr.length - 4) + loopIndex;
		var currentTargetNode = routeString.charAt(loopIndex);
		var currentVisitID = -1;
		var currentVisitChar = null;
		var currentValid = false;
		
		
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
		
		loopIndex += 1;
	}
	
	return matchSuccessful;
}


// Follows 'Sequence' template.
function followSequence(stepArr, nodeArr)
{
	var seqString = "EAC";
	var startNode = seqString.charAt(0);
	
	var sequenceIndex = -1;
	var sequenceFound = false;
	
	
	// Traverse route
	for (var stepIndex = 0; stepIndex < stepArr.length; stepIndex++)
	{
		// Read current node.
		var currentVisitID = stepArr[stepIndex];
		var currentVisitChar = nodeArr[currentVisitID];
		var currentSequenceNode = null;
		var currentMatch = false;
		
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
	
	// Check if sequence ends with route.
	if (sequenceIndex >= seqString.length) sequenceFound = true;
	
	return sequenceFound;
}


// Follows 'Choice' template.
function followChoice(stepArr, nodeArr)
{
	// Third node must be from set.
	var allowedNodes = ["A", "B", "C"];
	var visitID = stepArr[2];
	var visitChar = nodeArr[visitID];
	return allowedNodes.includes(visitChar);
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
	
	return (firstIncl !== true && secondIncl !== true);
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
	
	return (startMatch === true && endMatch === true);
}


// Follows 'Nest' template.
function followNesting(stepArr, nodeArr)
{
	// Alternates between A and C from second node onwards.
	
	var stepIndex = 1;
	var matchSuccessful = true;
	
	// Traverse route from second node until end reached or error found.
	while (stepIndex > 0 && stepIndex < stepArr.length && matchSuccessful)
	{
		// Reads current node.
		var currentAlternateFlag = stepIndex % 2;
		var currentNodeID = stepArr[stepIndex];
		var currentNodeChar = nodeArr[currentNodeID];
		var currentValid = false;
		
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
		
		stepIndex += 1;
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
	return allowedNodes.includes(choiceChar);
}


// Increments sequence step indes for the 'Sequence' template.
function updateSequenceProgression(nodesMatch, seqInd)
{
	return (nodesMatch) ? seqInd + 1 : -1;
}


module.exports =
{
	checkObject: checkResultObject
};