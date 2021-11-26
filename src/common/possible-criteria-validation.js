const numSigns = require("./enum/num-signs");
const criteriaTypes = require("./enum/criteria-types");

function loopCriteriaComplete(givenRoute, givenNodesArray, criteriaObjectArray)
{
	var finalDistance = givenRoute.distance;
	var finalStops = givenRoute.steps.length - 1;
	
	var itemIndex = 0;
	var currentCondition = null;
	var currentMatch = false;
	
	var loopRes = true;
	
	while (itemIndex >= 0 && itemIndex < criteriaObjectArray.length && loopRes === true)
	{
		currentCondition = criteriaObjectArray[itemIndex];
		currentMatch = false;
		
		if (currentCondition.type === criteriaTypes.START_NODE)
		{
			currentMatch = true;
		}
		else if (currentCondition.type === criteriaTypes.END_NODE)
		{
			currentMatch = true;
		}
		else if (currentCondition.type === criteriaTypes.STOP_COUNT)
		{
			currentMatch = checkCompleteNumberSign(finalStops, currentCondition);
		}
		else if (currentCondition.type === criteriaTypes.TOTAL_DISTANCE)
		{
			currentMatch = checkCompleteNumberSign(finalDistance, currentCondition);
		}
		else if (currentCondition.type === criteriaTypes.ONE_WAY)
		{
			currentMatch = true;
		}
		else if (currentCondition.type === criteriaTypes.TEMPLATE)
		{
			currentMatch = checkCompleteTemplate(givenNodesArray, givenRoute.steps, currentCondition);
		}
		
		if (currentMatch !== true)
		{
			loopRes = false;
		}
		
		itemIndex = itemIndex + 1;
	}
	
	return loopRes;
}


function loopCriteriaIncomplete(givenDistance, givenStops, criteriaObjectArray)
{
	var itemIndex = 0;
	var currentCondition = null;
	var currentMatch = false;
	
	var loopRes = true;
	
	while (itemIndex >= 0 && itemIndex < criteriaObjectArray.length && loopRes === true)
	{
		currentCondition = criteriaObjectArray[itemIndex];
		currentMatch = false;
		
		if (currentCondition.type === criteriaTypes.START_NODE)
		{
			currentMatch = true;
		}
		else if (currentCondition.type === criteriaTypes.END_NODE)
		{
			currentMatch = true;
		}
		else if (currentCondition.type === criteriaTypes.STOP_COUNT)
		{
			currentMatch = checkIncompleteNumberSign(givenStops, currentCondition);
		}
		else if (currentCondition.type === criteriaTypes.TOTAL_DISTANCE)
		{
			currentMatch = checkIncompleteNumberSign(givenDistance, currentCondition);
		}
		else if (currentCondition.type === criteriaTypes.ONE_WAY)
		{
			currentMatch = true;
		}
		else if (currentCondition.type === criteriaTypes.TEMPLATE)
		{
			currentMatch = true;
		}		
		
		if (currentMatch !== true)
		{
			loopRes = false;
		}
		
		itemIndex = itemIndex + 1;
	}
	
	return loopRes;
}


function checkCompleteNumberSign(actualValue, criteriaObj)
{
	var matchRes = false;
	
	if (criteriaObj.sign === numSigns.LESS && actualValue < criteriaObj.number)
	{
		// Less than.
		matchRes = true;
	}
	else if (criteriaObj.sign === numSigns.LESS_EQUAL && actualValue <= criteriaObj.number)
	{
		// Less than or equal to.
		matchRes = true;
	}
	else if (criteriaObj.sign === numSigns.EQUAL && actualValue === criteriaObj.number)
	{
		// Equal.
		matchRes = true;
	}
	else if (criteriaObj.sign === numSigns.GREAT && actualValue > criteriaObj.number)
	{
		// Greater than.
		matchRes = true;
	}
	else if (criteriaObj.sign === numSigns.GREAT_EQUAL && actualValue >= criteriaObj.number)
	{
		// Greater than or equal to.
		matchRes = true;
	}
	else
	{
		// Invalid.
		matchRes = false;
	}
	
	return matchRes;
}


function checkCompleteTemplate(nodeListObj, stepListObj, criteriaObj)
{
	var actualString = writeRouteString(stepListObj, nodeListObj);
	var matchRes = criteriaObj.compiled.test(actualString);
	return matchRes;
}



function checkIncompleteNumberSign(actualValue, criteriaObj)
{
	var matchRes = false;
	
	if (criteriaObj.sign === numSigns.LESS && actualValue >= criteriaObj.number)
	{
		// Above inclusive cutoff.
		matchRes = false;
	}
	else if (criteriaObj.sign === numSigns.LESS_EQUAL && actualValue > criteriaObj.number)
	{
		// Above exclusive cutoff.
		matchRes = false;
	}
	else if (criteriaObj.sign === numSigns.EQUAL && actualValue > criteriaObj.number)
	{
		// Above target.
		matchRes = false;
	}
	else
	{
		// Criteria met.
		matchRes = true;
	}
	
	return matchRes;
}


function writeRouteString(stepArr, nodesArr)
{
	var stepIndex = 0;
	var currentNode = -1;
	var writeRes = "";
	
	for (stepIndex = 0; stepIndex < stepArr.length; stepIndex = stepIndex + 1)
	{
		currentNode = stepArr[stepIndex];
		writeRes += nodesArr[currentNode];
	}
	
	return writeRes;
}



module.exports =
{
	loopComplete: loopCriteriaComplete,
	loopIncomplete: loopCriteriaIncomplete
};