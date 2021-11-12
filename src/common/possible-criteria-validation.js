const numSigns = require("./enum/num-signs");
const routeCriteria = require("./route-criteria");

function loopCriteriaComplete(givenDistance, givenStops, criteriaObjectArray)
{
	var itemIndex = 0;
	var currentCondition = null;
	var currentMatch = false;
	
	var loopRes = true;
	
	while (itemIndex >= 0 && itemIndex < criteriaObjectArray.length && loopRes === true)
	{
		currentCondition = criteriaObjectArray[itemIndex];
		currentMatch = false;
		
		if (currentCondition.type === routeCriteria.criteriaTypes.STOP_COUNT)
		{
			currentMatch = checkCompleteNumberSign(givenStops, currentCondition);
		}
		else if (currentCondition.type === routeCriteria.criteriaTypes.TOTAL_DISTANCE)
		{
			currentMatch = checkCompleteNumberSign(givenDistance, currentCondition);
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
		
		if (currentCondition.type === routeCriteria.criteriaTypes.STOP_COUNT)
		{
			currentMatch = checkIncompleteNumberSign(givenStops, currentCondition);
		}
		else if (currentCondition.type === routeCriteria.criteriaTypes.TOTAL_DISTANCE)
		{
			currentMatch = checkIncompleteNumberSign(givenDistance, currentCondition);
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
	
	if (criteriaObj === null)
	{
		// Criteria not set.
		matchRes = true;
	}
	else if (criteriaObj.sign === numSigns.LESS && actualValue < criteriaObj.number)
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




function checkIncompleteNumberSign(actualValue, criteriaObj)
{
	var matchRes = false;
	
	if (criteriaObj === null)
	{
		// Criteria not set.
		matchRes = true;
	}
	else if (criteriaObj.sign === numSigns.LESS && actualValue >= criteriaObj.number)
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




module.exports =
{
	loopComplete: loopCriteriaComplete,
	loopIncomplete: loopCriteriaIncomplete
};