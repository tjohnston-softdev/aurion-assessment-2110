const path = require("path");
const fs = require("fs");
const maxInpSize = 10000;

function readInputPathArgument(argList)
{
	var argsGiven = Array.isArray(argList);
	var retrievedArgument = "";
	var argType = "";
	var readRes = "input.txt";
	
	if (argsGiven === true && argList.length > 2)
	{
		retrievedArgument = argList[2];
		argType = typeof retrievedArgument;
	}
	
	if (argType === "string" && retrievedArgument.length > 0)
	{
		readRes = retrievedArgument;
	}
	
	return readRes;
}


function getInputFileEntry(targetPath)
{
	var statObject = null;
	var entryRes = {};
	var flagMsg = "";
	
	entryRes["retrieved"] = false;
	entryRes["correctType"] = false;
	entryRes["sizeBytes"] = -1;
	
	try
	{
		statObject = fs.statSync(targetPath);
		entryRes.retrieved = true;
		entryRes.correctType = statObject.isFile();
		entryRes.sizeBytes = statObject.size;
	}
	catch(e)
	{
		flagMsg = extractFileSystemError(e.message);
		displayFileSystemError("check", flagMsg);
	}
	
	return entryRes;
}


function validateInputFileEntry(entryObj)
{
	var validRes = false;
	
	if (entryObj.correctType === true && entryObj.sizeBytes > 0 && entryObj.sizeBytes <= maxInpSize)
	{
		validRes = true;
	}
	else if (entryObj.correctType === true && entryObj.sizeBytes > maxInpSize)
	{
		displayInputFileError("cannot be larger than 10kb.");
	}
	else if (entryObj.correctType === true)
	{
		displayInputFileError("cannot be empty.");
	}
	else
	{
		displayInputFileError("path actually refers to a directory.");
	}
	
	return validRes;
}


function extractFileSystemError(fullMsg)
{
	var colonIndex = fullMsg.indexOf(": ");
	var subBegin = colonIndex + 2;
	var subEnd = fullMsg.indexOf(",", subBegin);
	
	var extractRes = fullMsg.substring(subBegin, subEnd);
	return extractRes;
}


function displayFileSystemError(vAction, vReason)
{
	var prepTxt = ["Could not successfully ", vAction, " input file - ", vReason, "."].join("");
	console.log(prepTxt);
}


function displayInputFileError(vContext)
{
	var prepTxt = "Input file " + vContext;
	console.log(prepTxt);
}


module.exports =
{
	readPathArg: readInputPathArgument,
	getEntry: getInputFileEntry,
	validateEntry: validateInputFileEntry
};