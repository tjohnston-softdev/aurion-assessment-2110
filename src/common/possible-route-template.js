const startMatch = /\\S/g;
const endMatch = /\\E/g;
const spaceRegex = /\s/g;

function compileTemplateObjects(givenNodeList, givenCriteriaArray, critInspectObj, skipLoop)
{
	var validationResult = {};
	
	validationResult["successful"] = true;
	validationResult["reason"] = "";
	validationResult["itemNo"] = -1;
	
	if (skipLoop !== true)
	{
		loopTemplates(givenNodes, givenCriteria, critInspectObj);
	}
	
	return validationResult;
}


function loopTemplates(givenNodes, givenCriteria, inspectObj, validResObj)
{
	var loopIndex = 0;
	var loopCutoff = inspectObj.templatePointers.length;
	
	var currentPointer = -1;
	var currentCriteria = {};
	var currentPrepared = "";
	var currentFlags = "";
	var currentWritten = false;
	var currentCompile = null;
	
	var startGroup = getNodeGroup(givenNodes, inspectObj.startNodes);
	var endGroup = getNodeGroup(givenNodes,inspectObj.endNodes);
	
	while (loopIndex >= 0 && loopIndex < loopCutoff && validResObj.successful === true)
	{
		currentPointer = inspectObj.templatePointers[loopIndex];
		currentCriteria = givenCriteria[currentPointer];
		currentPrepared = prepareSyntaxString(currentCriteria.syntax, startGroup, endGroup);
		currentFlags = "";
		currentWritten = false;
		currentCompile = null;
		
		if (currentPrepared.length > 0)
		{
			currentFlags = getRegexFlags(currentCriteria.repeat);
			currentWritten = true;
			currentCompile = compileRegularExpression(currentPrepared, currentFlags);
		}
		
		if (currentWritten === true && currentCompile !== null)
		{
			currentCriteria.compiled = currentCompile;
		}
		else if (currentWritten === true)
		{
			validResObj.successful = false;
			validResObj.reason = "Template string is not a valid regular expression.";
			validResObj.itemNo = currentPointer;
		}
		else
		{
			validResObj.successful = false;
			validResObj.reason = "Template string cannot be empty.";
			validResObj.itemNo = currentPointer;
		}
		
		loopIndex = loopIndex + 1;
	}
	
}



function prepareSyntaxString(origStr, grpStart, grpEnd)
{
	var prepRes = origStr;
	
	prepRes = prepRes.trim();
	prepRes = prepRes.replace(spaceRegex, "");
	prepRes = prepRes.toUpperCase();
	prepRes = prepRes.replace(startMatch, grpStart);
	prepRes = prepRes.replace(endMatch, grpEnd);
	
	return prepRes;
}


function getRegexFlags(useGlobal)
{
	var flagRes = "i";
	
	if (useGlobal === true)
	{
		flagRes += "g";
	}
	
	return flagRes;
}


function compileRegularExpression(syntaxStr, flagStr)
{
	var compileRes = null;
	
	try
	{
		compileRes = new RegExp(syntaxStr, flagStr);
	}
	catch(parseErr)
	{
		compileRes = null;
	}
}



function getNodeGroup(nodesArrayObj, targetArrayObj)
{
	var joinStr = "";
	
	if (targetArrayObj.length > 0)
	{
		joinStr = writeNodesByTarget(nodesArrayObj, targetArrayObj);
	}
	else
	{
		joinStr = nodesArrayObj.join("|");
	}
	
	var groupRes = "(" + joinStr + ")";
	return groupRes;
}


function writeNodesByTarget(nodesArr, tgtArr)
{
	var targetIndex = 0;
	var currentNumber = -1;
	var writeRes = "";
	
	for (targetIndex = 0; targetIndex < tgtArr.length; targetIndex = targetIndex + 1)
	{
		currentNumber = tgtArr[targetIndex];
		
		if (targetIndex > 0)
		{
			writeRes += "|";
		}
		
		writeRes += nodesArr[currentNumber];
	}
	
	return writeRes;
}



module.exports =
{
	compileObjects: compileTemplateObjects
};