// Route criteria objects.

const criteriaTypes = require("./enum/criteria-types");


// 'Stop Count' constructor.
function defineStopCountCriteria(inpCount, inpSign)
{
	var defineRes = setNumberSign(criteriaTypes.STOP_COUNT, inpCount, inpSign);
	return defineRes;
}


// 'Total Distance' constructor.
function defineTotalDistanceCriteria(inpDist, inpSign)
{
	var defineRes = setNumberSign(criteriaTypes.TOTAL_DISTANCE, inpDist, inpSign);
	return defineRes;
}


function validateRouteCriteria(givenCriteriaArray)
{
	var arrayValid = Array.isArray(givenCriteriaArray);
	var validationResult = {};
	
	validationResult["successful"] = true;
	validationResult["reason"] = "";
	validationResult["itemNo"] = -1;
	validationResult["ignore"] = false;
	
	if (arrayValid === true)
	{
		iterateCriteriaValidation(givenCriteriaArray, validationResult);
	}
	else if (givenCriteriaArray === undefined || givenCriteriaArray === null)
	{
		validationResult.ignore = true;
	}
	else
	{
		validationResult.successful = false;
	}
	
	return validationResult;
}


function iterateCriteriaValidation(givenArray, validResultObj)
{
	var criteriaIndex = 0;
	var currentElement = null;
	var currentValid = false;
	
	while (criteriaIndex >= 0 && criteriaIndex < givenArray.length && validResultObj.successful === true)
	{
		currentElement = givenArray[criteriaIndex];
		currentValid = true;
		criteriaIndex = criteriaIndex + 1;
	}
}



// Validate object.
function readCriteria(givenObject, resultObject)
{
	var correctType = checkValueType(givenObject);
	var validationResult = false;
	
	if (correctType === true && givenObject.type === criteriaTypes.STOP_COUNT)
	{
		// Stop Count
		validationResult = handleNumberSign(givenObject);
	}
	else if (correctType === true && givenObject.type === criteriaTypes.TOTAL_DISTANCE)
	{
		// Total Distance
		validationResult = handleNumberSign(givenObject);
	}
	else if (correctType === true)
	{
		// Unknown criteria type.
		validationResult = false;
	}
	else if (typeFlag === 0)
	{
		// Invalid object type.
		validationResult = false;
	}
	else
	{
		// Empty
		validationResult = true;
	}
	
	return validationResult;
}


// Check 'stop count' and 'total distance' properties.
function handleNumberSign(criteriaObj)
{
	var numberVal = criteriaObj.number;
	var correctNumType = Number.isInteger(numberVal);
	var correctSignType = Number.isInteger(criteriaObj.sign);
	
	var handleRes = false;
	
	// Criteria number must be positive.
	if (correctNumType === true && correctSignType === true && numberVal > 0)
	{
		handleRes = true;
	}
	
	return handleRes;
}



// Reads criteria object value type before validation.
function checkValueType(givenObj)
{
	var valueType = typeof givenObj;
	var checkRes = false;
	
	if (givenObj !== undefined && givenObj !== null && valueType === "object")
	{
		checkRes = true;
	}
	
	return checkRes;
}


function setNumberSign(typeVal, numVal, signVal)
{
	var setRes = {};
	
	setRes["type"] = typeVal;
	setRes["number"] = numVal;
	setRes["sign"] = signVal;
	
	return setRes;
}


module.exports =
{
	defineStopCount: defineStopCountCriteria,
	defineTotalDistance: defineTotalDistanceCriteria,
	validateCriteria: validateRouteCriteria
};