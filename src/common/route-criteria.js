// Route criteria objects.

const criteriaTypes = require("./enum/criteria-types");
const maxStringLength = 1000;


// 'Start Node' constructor.
function defineStartNodeCriteria(inpNode)
{
	var defineRes = setTargetNode(criteriaTypes.START_NODE, inpNode);
	return defineRes;
}


// 'End Node' constructor.
function defineEndNodeCriteria(inpNode)
{
	var defineRes = setTargetNode(criteriaTypes.END_NODE, inpNode);
	return defineRes;
}


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

// 'One Way' constructor.
function defineOneWayCriteria()
{
	var defineRes = {"type": criteriaTypes.ONE_WAY};
	return defineRes;
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
	var validationResult = {};
	
	validationResult["successful"] = true;
	validationResult["reason"] = "";
	validationResult["itemNo"] = -1;
	validationResult["ignore"] = false;
	
	if (arrayValid === true)
	{
		iterateCriteriaValidation(givenNodesList, givenCriteriaArray, validationResult);
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


function iterateCriteriaValidation(givenNodes, givenArray, validResultObj)
{
	var loopIndex = 0;
	var currentElement = null;
	
	while (loopIndex >= 0 && loopIndex < givenArray.length && validResultObj.successful === true)
	{
		currentElement = givenArray[loopIndex];
		readCriteria(currentElement, validResultObj, loopIndex, givenNodes);
		loopIndex = loopIndex + 1;
	}
}



// Validate object.
function readCriteria(givenObject, resultObject, criteriaIndex, nodeListObject)
{
	var correctType = checkValueType(givenObject);
	var skipValidation = false;
	
	if (correctType === true && givenObject.type === criteriaTypes.START_NODE)
	{
		// Start node
		handleTargetNode(givenObject, resultObject, nodeListObject, criteriaIndex, "Start Node");
	}
	else if (correctType === true && givenObject.type === criteriaTypes.END_NODE)
	{
		// End node
		handleTargetNode(givenObject, resultObject, nodeListObject, criteriaIndex, "End Node");
	}
	else if (correctType === true && givenObject.type === criteriaTypes.STOP_COUNT)
	{
		// Stop Count
		handleNumberSign(givenObject, resultObject, criteriaIndex, "Stop Count");
	}
	else if (correctType === true && givenObject.type === criteriaTypes.TOTAL_DISTANCE)
	{
		// Total Distance
		handleNumberSign(givenObject, resultObject, criteriaIndex, "Total Distance");
	}
	else if (correctType === true && givenObject.type === criteriaTypes.ONE_WAY)
	{
		skipValidation = true;
	}
	else if (correctType === true && givenObject.type === criteriaTypes.TEMPLATE)
	{
		// Template
		handleTemplate(givenObject, resultObject, criteriaIndex);
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


// Check 'start node' and 'end node' properties.
function handleTargetNode(criteriaObj, resObj, existingNodes, critInd, critDesc)
{
	var givenType = typeof criteriaObj.node;
	var correctType = (givenType === "string" && criteriaObj.node.length > 0);
	var searchPerformed = false;
	var matchFlag = -1;
	
	var handleRes = false;
	
	if (correctType === true)
	{
		searchPerformed = true;
		matchFlag = existingNodes.indexOf(criteriaObj.node);
	}
	
	if (searchPerformed === true && matchFlag >= 0 && matchFlag < existingNodes.length)
	{
		criteriaObj.node = matchFlag;
		handleRes = true;
	}
	else if (searchPerformed === true)
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

// Check 'template' properties.
function handleTemplate(criteriaObj, resObj, critInd)
{
	var givenType = typeof criteriaObj.syntax;
	var sLength = -1;
	
	var handleRes = false;
	
	if (givenType === "string")
	{
		sLength = criteriaObj.syntax.length;
	}
	
	if (sLength >= 0 && sLength <= maxStringLength)
	{
		handleRes = true;
	}
	else if (sLength > maxStringLength)
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
	var givenType = typeof givenObj;
	var checkRes = (givenObj !== undefined && givenObj !== null && givenType === "object");
	return checkRes;
}


function setTargetNode(typeVal, nodeVal)
{
	var setRes = {};
	
	setRes["type"] = typeVal;
	setRes["node"] = nodeVal;
	
	return setRes;
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
	defineStartNode: defineStartNodeCriteria,
	defineEndNode: defineEndNodeCriteria,
	defineStopCount: defineStopCountCriteria,
	defineTotalDistance: defineTotalDistanceCriteria,
	defineOneWay: defineOneWayCriteria,
	defineTemplate: defineTemplateCriteria,
	validateCriteria: validateRouteCriteria
};