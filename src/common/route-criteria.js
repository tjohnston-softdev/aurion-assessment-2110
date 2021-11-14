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
		validationResult.reason = "Input must be a valid array.";
	}
	
	return validationResult;
}


function iterateCriteriaValidation(givenArray, validResultObj)
{
	var loopIndex = 0;
	var currentElement = null;
	
	while (loopIndex >= 0 && loopIndex < givenArray.length && validResultObj.successful === true)
	{
		currentElement = givenArray[loopIndex];
		readCriteria(currentElement, validResultObj, loopIndex);
		loopIndex = loopIndex + 1;
	}
}



// Validate object.
function readCriteria(givenObject, resultObject, criteriaIndex)
{
	var correctType = checkValueType(givenObject);
	
	if (correctType === true && givenObject.type === criteriaTypes.STOP_COUNT)
	{
		// Stop Count
		handleNumberSign(givenObject, resultObject, criteriaIndex, "Stop Count");
	}
	else if (correctType === true && givenObject.type === criteriaTypes.TOTAL_DISTANCE)
	{
		// Total Distance
		handleNumberSign(givenObject, resultObject, criteriaIndex, "Total Distance");
	}
	else if (correctType === true)
	{
		// Unknown criteria type.
		resultObject.successful = false;
		resultObject.reason = "Unknown criteria type.";
		resultObject.itemNo = criteriaIndex + 1;
	}
	else
	{
		// Invalid object type.
		resultObject.successful = false;
		resultObject.reason = "Value type not allowed.";
		resultObject.itemNo = criteriaIndex + 1;
	}
}


// Check 'stop count' and 'total distance' properties.
function handleNumberSign(criteriaObj, resObj, critInd, critDesc)
{
	var numberVal = criteriaObj.number;
	var correctNumType = Number.isInteger(numberVal);
	var correctSignType = Number.isInteger(criteriaObj.sign);
	
	var handleRes = false;
	
	if (correctNumType === true && correctSignType === true && numberVal > 0)
	{
		handleRes = true;
	}
	else if (correctNumType === true && correctSignType === true)
	{
		resObj.successful = false;
		resObj.reason = critDesc + " number must be positive.";
		resObj.itemNo = critInd + 1;
	}
	else if (correctNumType === true)
	{
		resObj.successful = false;
		resObj.reason = critDesc + " number sign is invalid.";
		resObj.itemNo = critInd + 1;
	}
	else
	{
		resObj.successful = false;
		resObj.reason = critDesc + " number must be whole.";
		resObj.itemNo = critInd + 1;
	}
}



// Reads criteria object value type before validation.
function checkValueType(givenObj)
{
	var valueType = typeof givenObj;
	var checkRes = (givenObj !== undefined && givenObj !== null && valueType === "object");
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