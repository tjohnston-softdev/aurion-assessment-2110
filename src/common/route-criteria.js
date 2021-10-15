// Route criteria object.


// Constructor.
function defineRouteCriteria(crNumber, crSign)
{
	var defineRes = {"number": crNumber, "sign": crSign};
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
		validationResult = handleCriteriaObject(givenObject);
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
function handleCriteriaObject(criteriaObj)
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


module.exports =
{
	defineCriteria: defineRouteCriteria,
	validateCriteria: validateRouteCriteria,
};