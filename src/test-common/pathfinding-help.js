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



module.exports =
{
	checkOutputDistance: checkOutputDistanceNumber,
	checkMultiplePossibleRoutes: checkMultiplePossibleRoutesResult
};