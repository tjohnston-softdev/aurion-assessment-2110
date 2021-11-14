// Validate output distance number for valid pathfinding cases.
function checkOutputDistanceNumber(distNum)
{
	var correctType = Number.isInteger(distNum);
	var checkRes = false;
	
	if (correctType === true && distNum > 0)
	{
		// Valid.
		checkRes = true;
	}
	else
	{
		// Invalid.
		throw new Error("Output must be a positive, whole number.");
	}
}


// Validates result value for multiple possible routes.
function checkMultiplePossibleRoutesResult(countNum)
{
	var correctType = Number.isInteger(countNum);
	var checkRes = false;
	
	if (correctType === true && countNum >= 2)
	{
		// Valid.
		checkRes = true;
	}
	else
	{
		// Invalid.
		throw new Error("Output must be a whole number that is at least 2.");
	}
}


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
		isolatedMessage = readCriteriaMessage(givenValue);
	}
	
	if (isolatedMessage.length > 0)
	{
		stringExists = true;
		correctStart = isolatedMessage.startsWith("INVALID ROUTE CRITERIA");
		correctEnd = isolatedMessage.endsWith(desiredMessage);
	}
	
	
	if (stringExists === true && correctStart === true && correctEnd === true)
	{
		checkRes = true;
	}
	else if (stringExists === true && correctStart === true)
	{
		flagIncorrectCriteriaMessage(desireStr);
	}
	else if (stringExists === true)
	{
		throw new Error("Invalid output message type.");
	}
	else
	{
		throw new Error("No output message given.");
	}
	
}


function readCriteriaMessage(fullText)
{
	var bracketInd = fullText.indexOf(" (ITEM ");
	var substringRes = fullText;
	
	if (bracketInd >= 0 && bracketInd < fullText.length)
	{
		substringRes = fullText.substring(0, bracketInd);
	}
	
	return substringRes;
}


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