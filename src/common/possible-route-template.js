// Validate and compile Regular Expressions for template criteria.

const startMatch = /\\S/g;
const endMatch = /\\E/g;
const spaceRegex = /\s/g;

// Main function.
function compileTemplateObjects(givenNodeList, givenCriteriaArray, critInspectObj, skipLoop)
{
	var validationResult = {successful: true, reason: "", itemNo: -1};
	
	
	if (!skipLoop)
	{
		loopTemplates(givenNodeList, givenCriteriaArray, critInspectObj, validationResult);
	}
	
	return validationResult;
}


// Loop marked template criteria.
function loopTemplates(givenNodes, givenCriteria, inspectObj, validResObj)
{
	var loopIndex = 0;
	var loopCutoff = inspectObj.templatePointers.length;
	
	var startGroup = "";
	var endGroup = "";
	
	// Write RegExp syntax for 'start' and 'end' node groups.
	startGroup = getNodeGroup(givenNodes, inspectObj.startNodes);
	endGroup = getNodeGroup(givenNodes,inspectObj.endNodes);
	
	// Loop templates until all compiled or error found.
	while (loopIndex >= 0 && loopIndex < loopCutoff && validResObj.successful)
	{
		// Read current criteria.
		var currentPointer = inspectObj.templatePointers[loopIndex];
		var currentCriteria = givenCriteria[currentPointer];
		
		// Prepare given RegExp string.
		var currentPrepared = prepareSyntaxString(currentCriteria.syntax, startGroup, endGroup);
		var currentFlags = "";
		var currentWritten = false;
		var currentCompile = null;
		
		
		if (currentPrepared.length > 0)
		{
			// Prepared string is not empty - Compile into RegExp.
			currentFlags = getRegexFlags(currentCriteria.repeat);
			currentWritten = true;
			currentCompile = compileRegularExpression(currentPrepared, currentFlags);
		}
		
		if (currentWritten && currentCompile !== null)
		{
			// Successful.
			currentCriteria.compiled = currentCompile;
		}
		else if (currentWritten)
		{
			// Invalid expression.
			validResObj.successful = false;
			validResObj.reason = "Template string is not a valid regular expression.";
			validResObj.itemNo = currentPointer;
		}
		else
		{
			// Empty string.
			validResObj.successful = false;
			validResObj.reason = "Template string cannot be empty.";
			validResObj.itemNo = currentPointer;
		}
		
		
		loopIndex += 1;
	}
	
}


// Prepares RegExp string before it is compiled.
function prepareSyntaxString(origStr, grpStart, grpEnd)
{
	var prepRes = origStr.trim().replace(spaceRegex, "");
	prepRes = prepRes.toUpperCase();
	prepRes = prepRes.replace(startMatch, grpStart);
	return prepRes.replace(endMatch, grpEnd);
	
}


// Set Regular Expression flags.
function getRegexFlags(useGlobal)
{
	return useGlobal ? "g" : "i";
}


// Compiles string into Regular Expression object.
function compileRegularExpression(syntaxStr, flagStr)
{
	var compileRes;
	
	try
	{
		// Compile.
		compileRes = new RegExp(syntaxStr, flagStr);
	}
	catch(parseErr)
	{
		// Error caught.
		compileRes = null;
	}
	
	return compileRes;
}


// Writes node group into RegExp syntax.
function getNodeGroup(nodesArrayObj, targetArrayObj)
{
	var joinStr;
	
	if (targetArrayObj.length > 0)
	{
		// Use selected nodes.
		joinStr = writeNodesByTarget(nodesArrayObj, targetArrayObj);
	}
	else
	{
		// Use all nodes.
		joinStr = nodesArrayObj.join("|");
	}
	
	return "(" + joinStr + ")";
}


// Join group nodes by vertical pipe.
function writeNodesByTarget(nodesArr, tgtArr)
{
	var targetIndex = 0;
	var writeRes = "";
	
	// Loop nodes in group.
	for (var targetIndex = 0; targetIndex < tgtArr.length; targetIndex++)
	{
		var currentNumber = tgtArr[targetIndex];
		
		if (targetIndex > 0)
		{
			// Add pipe on end of previous node.
			writeRes += "|";
		}
		
		// Add current node letter.
		writeRes += nodesArr[currentNumber];
	}
	
	return writeRes;
}



module.exports =
{
	compileObjects: compileTemplateObjects
};