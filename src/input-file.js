const path = require("path");
const fs = require("fs");
const errorMessages = require("./common/error-messages");
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
	catch(fsErr)
	{
		errorMessages.displayFileSystem("check", fsErr);
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
		errorMessages.displayInputFile("cannot be larger than 10kb.");
	}
	else if (entryObj.correctType === true)
	{
		errorMessages.displayInputFile("cannot be empty.");
	}
	else
	{
		errorMessages.displayInputFile("path actually refers to a directory.");
	}
	
	return validRes;
}


function readInputFileContents(targetPath)
{
	var readRes = null;
	
	try
	{
		readRes = fs.readFileSync(targetPath, "utf8");
	}
	catch(fsErr)
	{
		errorMessages.displayFileSystem("read", fsErr);
	}
	
	return readRes;
}




module.exports =
{
	readPathArg: readInputPathArgument,
	getEntry: getInputFileEntry,
	validateEntry: validateInputFileEntry,
	readContents: readInputFileContents
};