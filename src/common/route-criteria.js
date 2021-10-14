function defineRouteCriteria(crNumber, crSign)
{
	var defineRes = {"number": crNumber, "sign": crSign};
	return defineRes;
}



function validateRouteCriteria(givenObject)
{
	var valueType = typeof givenObject;
	var validationResult = false;
	
	if (givenObject !== null && valueType === "object")
	{
		validationResult = handleCriteriaObject(givenObject);
	}
	else if (givenObject !== null)
	{
		validationResult = false;
	}
	else
	{
		validationResult = true;
	}
	
	return validationResult;
}


function handleCriteriaObject(criteriaObj)
{
	var numberVal = criteriaObj.number;
	var correctNumType = Number.isInteger(numberVal);
	var correctSignType = Number.isInteger(criteriaObj.sign);
	
	var handleRes = false;
	
	if (correctNumType === true && correctSignType === true && numberVal > 0)
	{
		handleRes = true;
	}
	
	return handleRes;
}


module.exports =
{
	defineCriteria: defineRouteCriteria,
	validateCriteria: validateRouteCriteria,
};