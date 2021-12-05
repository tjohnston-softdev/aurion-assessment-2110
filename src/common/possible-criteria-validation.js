/*
	Validates route against criteria for 'possible routes' pathfinding.
	Separate validation for complete and incomplete routes.
*/

const numSigns = require("./enum/num-signs");
const criteriaTypes = require("./enum/criteria-types");


// Main Function - Complete
function loopCriteriaComplete(givenRoute, givenNodesArray, criteriaObjectArray)
{
	var finalDistance = givenRoute.distance;
	var finalStops = givenRoute.steps.length - 1;
	
	var itemIndex = 0;
	var currentCondition = null;
	var currentMatch = false;
	
	var loopRes = true;
	
	// Loop criteria until all checked or error found.
	while (itemIndex >= 0 && itemIndex < criteriaObjectArray.length && loopRes === true)
	{
		currentCondition = criteriaObjectArray[itemIndex];
		currentMatch = false;
		
		if (currentCondition.type === criteriaTypes.START_NODE)
		{
			// Start node.
			currentMatch = true;
		}
		else if (currentCondition.type === criteriaTypes.END_NODE)
		{
			// End node.
			currentMatch = true;
		}
		else if (currentCondition.type === criteriaTypes.STOP_COUNT)
		{
			// Stop count.
			currentMatch = checkCompleteNumberSign(finalStops, currentCondition);
		}
		else if (currentCondition.type === criteriaTypes.TOTAL_DISTANCE)
		{
			// Total distance.
			currentMatch = checkCompleteNumberSign(finalDistance, currentCondition);
		}
		else if (currentCondition.type === criteriaTypes.ONE_WAY)
		{
			// One way.
			currentMatch = true;
		}
		else if (currentCondition.type === criteriaTypes.TEMPLATE)
		{
			// Template.
			currentMatch = checkCompleteTemplate(givenNodesArray, givenRoute.steps, currentCondition);
		}
		
		
		if (currentMatch !== true)
		{
			// Criteria error found.
			loopRes = false;
		}
		
		itemIndex = itemIndex + 1;
	}
	
	return loopRes;
}


// Main Function - Incomplete.
function loopCriteriaIncomplete(givenDistance, givenStops, criteriaObjectArray)
{
	var itemIndex = 0;
	var currentCondition = null;
	var currentMatch = false;
	
	var loopRes = true;
	
	
	// Loop criteria until all checked or error found.
	while (itemIndex >= 0 && itemIndex < criteriaObjectArray.length && loopRes === true)
	{
		currentCondition = criteriaObjectArray[itemIndex];
		currentMatch = false;
		
		if (currentCondition.type === criteriaTypes.START_NODE)
		{
			// Start node.
			currentMatch = true;
		}
		else if (currentCondition.type === criteriaTypes.END_NODE)
		{
			// End node.
			currentMatch = true;
		}
		else if (currentCondition.type === criteriaTypes.STOP_COUNT)
		{
			// Stop count.
			currentMatch = checkIncompleteNumberSign(givenStops, currentCondition);
		}
		else if (currentCondition.type === criteriaTypes.TOTAL_DISTANCE)
		{
			// Total distance.
			currentMatch = checkIncompleteNumberSign(givenDistance, currentCondition);
		}
		else if (currentCondition.type === criteriaTypes.ONE_WAY)
		{
			// One way.
			currentMatch = true;
		}
		else if (currentCondition.type === criteriaTypes.TEMPLATE)
		{
			// Template.
			currentMatch = true;
		}		
		
		if (currentMatch !== true)
		{
			// Criteria error found.
			loopRes = false;
		}
		
		itemIndex = itemIndex + 1;
	}
	
	return loopRes;
}


// Stop count and total distance value - Complete.
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


// Check completed route against template RegExp.
function checkCompleteTemplate(nodeListObj, stepListObj, criteriaObj)
{
	var actualString = writeRouteString(stepListObj, nodeListObj);
	var matchRes = criteriaObj.compiled.test(actualString);
	return matchRes;
}



// Stop count and total distance value - Incomplete.
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


// Writes completed route as a string of node characters.
function writeRouteString(stepArr, nodesArr)
{
	var stepIndex = 0;
	var currentNode = -1;
	var writeRes = "";
	
	// Loop route steps.
	for (stepIndex = 0; stepIndex < stepArr.length; stepIndex = stepIndex + 1)
	{
		// Get node character from ID.
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