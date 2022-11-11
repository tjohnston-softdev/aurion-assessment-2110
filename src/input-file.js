// Functions related to reading the input file.

const path = require("path");
const fs = require("fs");
const errorMessages = require("./common/error-messages");
const maxInpSize = 10000;	// 10kb


// Retrieve path argument.
function readInputPathArgument(argList)
{
	var argsGiven = Array.isArray(argList);
	var retrievedArgument = (argsGiven && argList.length > 2) ? retrievedArgument = argList[2] : null;
	var readRes = "input.txt";		// Default.
	
	
	if (typeof retrievedArgument === "string" && retrievedArgument.length > 0)
	{
		// String valid.
		readRes = retrievedArgument;
	}
	
	return readRes;
}


// Retrieve file system entry from input path.
function getInputFileEntry(targetPath)
{
	var entryRes = {"retrieved": false, "correctType": false, "sizeBytes": -1};
	
	try
	{
		// Attempt to read entry.
		var statObject = fs.statSync(targetPath);
		entryRes.retrieved = true;
		entryRes.correctType = statObject.isFile();
		entryRes.sizeBytes = statObject.size;
	}
	catch(fsErr)
	{
		// File system error.
		errorMessages.displayFileSystem("check", fsErr);
	}
	
	return entryRes;
}


// Validate file system entry after it has been retrieved.
function validateInputFileEntry(entryObj)
{
	var validRes = false;
	
	if (entryObj.correctType && entryObj.sizeBytes > 0 && entryObj.sizeBytes <= maxInpSize)
	{
		validRes = true;
	}
	else if (entryObj.correctType && entryObj.sizeBytes > maxInpSize)
	{
		errorMessages.displayInputFile("cannot be larger than 10kb.");
	}
	else if (entryObj.correctType)
	{
		errorMessages.displayInputFile("cannot be empty.");
	}
	else
	{
		errorMessages.displayInputFile("path actually refers to a directory.");
	}
	
	return validRes;
}


// Reads contents from input file.
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