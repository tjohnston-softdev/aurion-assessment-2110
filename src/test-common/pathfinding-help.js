// Generic helper functions for pathfinding unit tests.


// Validate output distance number for valid pathfinding cases.
function checkOutputDistanceNumber(distNum)
{
	var correctType = Number.isInteger(distNum);
	var checkRes = (correctType && distNum > 0)
	if (!checkRes) throw new Error("Output must be a positive, whole number.");
}


// Validates result value for multiple possible routes.
function checkMultiplePossibleRoutesResult(countNum)
{
	var correctType = Number.isInteger(countNum);
	var checkRes = (correctType === true && countNum >= 2)
	if (!checkRes) throw new Error("Output must be a whole number that is at least 2.");
}


// Checks whether the output error message for criteria validation is correct.
function checkInvalidCriteriaMessageText(givenValue, desiredMessage)
{
	var valueType = typeof givenValue;
	var isolatedMessage = "";
	
	var stringExists = false;
	var correctStart = false;
	var correctEnd = false;
	
	var checkRes = false;
	
	
	if (valueType === "string")
	{
		// Isolate message from string, up until the item suffix.
		isolatedMessage = readCriteriaMessage(givenValue);
	}
	
	
	if (isolatedMessage.length > 0)
	{
		// Message extracted successfully - Check start and end contents.
		stringExists = true;
		correctStart = isolatedMessage.startsWith("INVALID ROUTE CRITERIA");
		correctEnd = isolatedMessage.endsWith(desiredMessage);
	}
	
	
	if (stringExists && correctStart && correctEnd)
	{
		checkRes = true;
	}
	else if (stringExists && correctStart)
	{
		flagIncorrectCriteriaMessage(desireStr);
	}
	else if (stringExists)
	{
		throw new Error("Invalid output message type.");
	}
	else
	{
		throw new Error("No output message given.");
	}
	
}

// Extracts criteria error message from string.
function readCriteriaMessage(fullText)
{
	var bracketInd = fullText.indexOf(" (ITEM ");
	var substringRes = fullText;
	
	if (bracketInd >= 0 && bracketInd < fullText.length)
	{
		// Read until 'ITEM' suffix.
		substringRes = fullText.substring(0, bracketInd);
	}
	
	return substringRes;
}


// Incorrect criteria message.
function flagIncorrectCriteriaMessage(vExp)
{
	var preparedText = ["Incorrect criteria message.\r\n", "Should had been: '", vExp, "'"].join("");
	throw new Error(preparedText);
}



module.exports =
{
	checkOutputDistance: checkOutputDistanceNumber,
	checkMultiplePossibleRoutes: checkMultiplePossibleRoutesResult,
	checkInvalidCriteriaMessage: checkInvalidCriteriaMessageText
};