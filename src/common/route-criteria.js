// Route criteria objects.

const criteriaTypes = require("./enum/criteria-types");
const maxStringLength = 1000;


function defineStartNodeCriteria(inpNode)
{
	return setTargetNode(criteriaTypes.START_NODE, inpNode);
}


function defineEndNodeCriteria(inpNode)
{
	return setTargetNode(criteriaTypes.END_NODE, inpNode);
}


function defineStopCountCriteria(inpCount, inpSign)
{
	return setNumberSign(criteriaTypes.STOP_COUNT, inpCount, inpSign);
}


function defineTotalDistanceCriteria(inpDist, inpSign)
{
	return setNumberSign(criteriaTypes.TOTAL_DISTANCE, inpDist, inpSign);
}

function defineOneWayCriteria()
{
	return {"type": criteriaTypes.ONE_WAY};
}

// 'RegExp' constructor.
function defineTemplateCriteria(inpString, inpRepeat)
{
	var defineRes = {};
	
	defineRes["type"] = criteriaTypes.TEMPLATE;
	defineRes["syntax"] = inpString;
	defineRes["repeat"] = inpRepeat;
	defineRes["compiled"] = null;
	
	return defineRes;
}


function validateRouteCriteria(givenNodesList, givenCriteriaArray)
{
	var arrayValid = Array.isArray(givenCriteriaArray);
	var validationResult = {successful: true, reason: "", itemNo: -1, ignore: false};
	
	
	if (arrayValid)
	{
		// Loop criteria objects.
		iterateCriteriaValidation(givenNodesList, givenCriteriaArray, validationResult);
	}
	else if (givenCriteriaArray === undefined || givenCriteriaArray === null)
	{
		// Empty criteria.
		validationResult.ignore = true;
	}
	else
	{
		// Invalid value type.
		validationResult.successful = false;
		validationResult.reason = "Input must be a valid array.";
	}
	
	return validationResult;
}


function iterateCriteriaValidation(givenNodes, givenArray, validResultObj)
{
	var loopIndex = 0;
	
	// Loop until end reached or error found.
	while (loopIndex >= 0 && loopIndex < givenArray.length && validResultObj.successful)
	{
		var currentElement = givenArray[loopIndex];
		readCriteria(currentElement, validResultObj, loopIndex, givenNodes);
		loopIndex += 1;
	}
}



function readCriteria(givenObject, resultObject, criteriaIndex, nodeListObject)
{
	var correctType = checkValueType(givenObject);
	var skipValidation = false;
	
	if (correctType && givenObject.type === criteriaTypes.START_NODE)
	{
		// Start node
		handleTargetNode(givenObject, resultObject, nodeListObject, criteriaIndex, "Start Node");
	}
	else if (correctType && givenObject.type === criteriaTypes.END_NODE)
	{
		// End node
		handleTargetNode(givenObject, resultObject, nodeListObject, criteriaIndex, "End Node");
	}
	else if (correctType && givenObject.type === criteriaTypes.STOP_COUNT)
	{
		// Stop Count
		handleNumberSign(givenObject, resultObject, criteriaIndex, "Stop Count");
	}
	else if (correctType && givenObject.type === criteriaTypes.TOTAL_DISTANCE)
	{
		// Total Distance
		handleNumberSign(givenObject, resultObject, criteriaIndex, "Total Distance");
	}
	else if (correctType && givenObject.type === criteriaTypes.ONE_WAY)
	{
		skipValidation = true;
	}
	else if (correctType && givenObject.type === criteriaTypes.TEMPLATE)
	{
		// Template
		handleTemplate(givenObject, resultObject, criteriaIndex);
	}
	else if (correctType)
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


// Check 'start node' and 'end node' properties.
function handleTargetNode(criteriaObj, resObj, existingNodes, critInd, critDesc)
{
	var correctType = (typeof criteriaObj.node === "string" && criteriaObj.node.length > 0);
	var searchPerformed = false;
	var matchFlag = -1;
	
	var handleRes = false;
	
	if (correctType)
	{
		// Check if node exists.
		searchPerformed = true;
		matchFlag = existingNodes.indexOf(criteriaObj.node);
	}
	
	
	if (searchPerformed && matchFlag >= 0 && matchFlag < existingNodes.length)
	{
		criteriaObj.node = matchFlag;
		handleRes = true;
	}
	else if (searchPerformed)
	{
		resObj.successful = false;
		resObj.reason = critDesc + " node does not exist.";
		resObj.itemNo = critInd + 1;
	}
	else
	{
		resObj.successful = false;
		resObj.reason = critDesc + " must be a valid, non-empty string.";
		resObj.itemNo = critInd + 1;
	}
	
}


// Check 'stop count' and 'total distance' properties.
function handleNumberSign(criteriaObj, resObj, critInd, critDesc)
{
	var numberVal = criteriaObj.number;
	var correctNumType = Number.isInteger(numberVal);
	var correctSignType = Number.isInteger(criteriaObj.sign);
	
	var handleRes = false;
	
	if (correctNumType && correctSignType && numberVal > 0)
	{
		// Valid.
		handleRes = true;
	}
	else if (correctNumType && correctSignType)
	{
		// Must be positive.
		resObj.successful = false;
		resObj.reason = critDesc + " number must be positive.";
		resObj.itemNo = critInd + 1;
	}
	else if (correctNumType)
	{
		// Invalid sign.
		resObj.successful = false;
		resObj.reason = critDesc + " number sign is invalid.";
		resObj.itemNo = critInd + 1;
	}
	else
	{
		// Invalid value type.
		resObj.successful = false;
		resObj.reason = critDesc + " number must be whole.";
		resObj.itemNo = critInd + 1;
	}
}

// Check 'template' properties.
function handleTemplate(criteriaObj, resObj, critInd)
{
	var templateStringLength = (typeof criteriaObj.syntax === "string") ? criteriaObj.syntax.length : -1;
	var handleRes = false;
	
	if (templateStringLength >= 0 && templateStringLength <= maxStringLength)
	{
		handleRes = true;
	}
	else if (templateStringLength > maxStringLength)
	{
		resObj.successful = false;
		resObj.reason = "Template string is too long.";
		resObj.itemNo = critInd + 1;
	}
	else
	{
		resObj.successful = false;
		resObj.reason = "Template must be a valid, non-empty string.";
		resObj.itemNo = critInd + 1;
	}
}



// Reads criteria object value type before validation.
function checkValueType(givenObj)
{
	return (givenObj !== undefined && givenObj !== null && typeof givenObj === "object");
}


// Creates object for 'start' and 'end' criteria.
function setTargetNode(typeVal, nodeVal)
{
	return {type: typeVal, node: nodeVal};
}


// Creates object for 'stop count' or 'total distance' criteria.
function setNumberSign(typeVal, numVal, signVal)
{
	return {type: typeVal, number: numVal, sign: signVal};
}


module.exports =
{
	defineStartNode: defineStartNodeCriteria,
	defineEndNode: defineEndNodeCriteria,
	defineStopCount: defineStopCountCriteria,
	defineTotalDistance: defineTotalDistanceCriteria,
	defineOneWay: defineOneWayCriteria,
	defineTemplate: defineTemplateCriteria,
	validateCriteria: validateRouteCriteria
};