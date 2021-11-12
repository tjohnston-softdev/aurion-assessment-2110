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
	var valueType = typeof givenObject;
	var validationResult = false;
	
	if (givenObject !== null && valueType === "object")
	{
		// Check properties.
		validationResult = handleNumberSign(givenObject);
	}
	else if (givenObject !== null)
	{
		// Invalid type.
		validationResult = false;
	}
	else
	{
		// Empty.
		validationResult = true;
	}
	
	return validationResult;
}


// Check object properties.
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