// Route criteria objects.

const criteriaTypesEnum =
{
	"STOP_COUNT": 1,
	"TOTAL_DISTANCE": 2
};


// 'Stop Count' constructor.
function defineStopCountCriteria(inpCount, inpSign)
{
	var defineRes = setNumberSign(criteriaTypesEnum.STOP_COUNT, inpCount, inpSign);
	return defineRes;
}


// 'Total Distance' constructor.
function defineTotalDistanceCriteria(inpDist, inpSign)
{
	var defineRes = setNumberSign(criteriaTypesEnum.TOTAL_DISTANCE, inpDist, inpSign);
	return defineRes;
}



// Validate object.
function validateRouteCriteria(givenObject)
{
	var typeFlag = checkValueType(givenObject);
	var validationResult = false;
	
	if (typeFlag > 0 && givenObject.type === criteriaTypesEnum.STOP_COUNT)
	{
		// Stop Count
		validationResult = handleNumberSign(givenObject);
	}
	else if (typeFlag > 0 && givenObject.type === criteriaTypesEnum.TOTAL_DISTANCE)
	{
		// Total Distance
		validationResult = handleNumberSign(givenObject);
	}
	else if (typeFlag > 0)
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
	var checkRes = -1;
	
	if (givenObj !== null && valueType === "object")
	{
		// Valid object.
		checkRes = 1;
	}
	else if (givenObj !== null)
	{
		// Invalid value type.
		checkRes = 0;
	}
	else
	{
		// Null.
		checkRes = -1;
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
	criteriaTypes: criteriaTypesEnum,
	defineStopCount: defineStopCountCriteria,
	defineTotalDistance: defineTotalDistanceCriteria,
	validateCriteria: validateRouteCriteria
};