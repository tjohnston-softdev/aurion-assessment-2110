// Functions related to reading the input file.

const path = require("path");
const fs = require("fs");
const errorMessages = require("./common/error-messages");
const maxInpSize = 10000;			// 10kb



// Retrieve path argument.
function readInputPathArgument(argList)
{
	var argsGiven = Array.isArray(argList);
	var retrievedArgument = "";
	var argType = "";
	var readRes = "input.txt";		// Default.
	
	if (argsGiven === true && argList.length > 2)
	{
		// Read argument
		retrievedArgument = argList[2];
		argType = typeof retrievedArgument;
	}
	
	if (argType === "string" && retrievedArgument.length > 0)
	{
		// String valid.
		readRes = retrievedArgument;
	}
	
	return readRes;
}


// Retrieve file system entry from input path.
function getInputFileEntry(targetPath)
{
	var statObject = null;
	var entryRes = {};
	
	entryRes["retrieved"] = false;
	entryRes["correctType"] = false;
	entryRes["sizeBytes"] = -1;
	
	try
	{
		// Attempt to read entry.
		statObject = fs.statSync(targetPath);
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
	
	if (entryObj.correctType === true && entryObj.sizeBytes > 0 && entryObj.sizeBytes <= maxInpSize)
	{
		// Valid input file.
		validRes = true;
	}
	else if (entryObj.correctType === true && entryObj.sizeBytes > maxInpSize)
	{
		// Too large.
		errorMessages.displayInputFile("cannot be larger than 10kb.");
	}
	else if (entryObj.correctType === true)
	{
		// Empty.
		errorMessages.displayInputFile("cannot be empty.");
	}
	else
	{
		// Folder.
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
		// Attempt read.
		readRes = fs.readFileSync(targetPath, "utf8");
	}
	catch(fsErr)
	{
		// File system error.
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