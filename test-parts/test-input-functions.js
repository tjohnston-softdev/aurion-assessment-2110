// Unit testing for input-related functions.

const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const inputFile = require("../src/input-file");

const validFilePath = "./submission.js";
const invalidFilePath = "./unknown.txt";
const unknownErrorText = "- no such file or directory.";


// Main function.
function runTests()
{
	describe("Input File", function()
	{
		handleArgumentFunction();
		handleGetFileEntry();
		handleValidateFileEntry();
		handleReadFile();
	});
}

// readPathArg
function handleArgumentFunction()
{
	describe("Read Path Argument", function()
	{
		var defaultValue = "input.txt";
		
		it("Valid Entry", function()
		{
			var enteredPath = "./example-file.txt";
			var argArray = defineArgsObject(enteredPath);
			var resultValue = inputFile.readPathArg(argArray);
			expect(resultValue).to.equal(enteredPath);
		});
		
		it("Empty String", function()
		{
			var argArray = defineArgsObject("");
			var resultValue = inputFile.readPathArg(argArray);
			expect(resultValue).to.equal(defaultValue);
		});
		
		it("Invalid Argument Type", function()
		{
			var argArray = defineArgsObject(-1);
			var resultValue = inputFile.readPathArg(argArray);
			expect(resultValue).to.equal(defaultValue);
		});
		
		it("Empty Arguments Array", function()
		{
			var emptyArray = [];
			var resultValue = inputFile.readPathArg(emptyArray);
			expect(resultValue).to.equal(defaultValue);
		});
		
		it("Invalid Arguments Array Type", function()
		{
			var resultValue = inputFile.readPathArg(null);
			expect(resultValue).to.equal(defaultValue);
		});
		
	});
}


// getEntry
function handleGetFileEntry()
{
	describe("Get Input File Entry", function()
	{
		it("Valid File Path", function()
		{
			var resultValue = inputFile.getEntry(validFilePath);
			checkEntry(resultValue, true);
			checkFileSize(resultValue.sizeBytes);
		});
		
		it("Valid Folder Path", function()
		{
			var resultValue = inputFile.getEntry(".");
			checkEntry(resultValue, false)
			expect(resultValue.sizeBytes).to.equal(0);
		});
		
		it("Unknown Path", function()
		{
			// Throw error.
			callUnknownFile();
		});
		
	});
}


// validateEntry
function handleValidateFileEntry()
{
	describe("Validate Input File Entry", function()
	{
		it("Valid Entry", function()
		{
			var givenObject = defineRetrievedEntry(true, 50);
			var resultValue = inputFile.validateEntry(givenObject);
			expect(resultValue).to.be.true;
		});
		
		it("Too Large", function()
		{
			var givenObject = defineRetrievedEntry(true, Number.POSITIVE_INFINITY);
			callInvalidEntry(givenObject, "cannot be larger than 10kb.");
		});
		
		it("Empty", function()
		{
			var givenObject = defineRetrievedEntry(true, 0);
			callInvalidEntry(givenObject, "cannot be empty.");
		});
		
		it("Directory", function()
		{
			var givenObject = defineRetrievedEntry(false, 0);
			callInvalidEntry(givenObject, "path actually refers to a directory.");
		});
	});
}


// readContents
function handleReadFile()
{
	describe("Read Contents", function()
	{
		it("File", function()
		{
			var resultValue = inputFile.readContents(validFilePath);
			expect(resultValue).to.be.a("string");
			expect(resultValue.length).to.be.above(0);
		});
		
		it("Folder", function()
		{
			callInvalidRead(".", "- illegal operation on a directory.");
		});
		
		it("Unknown", function()
		{
			callInvalidRead(invalidFilePath, unknownErrorText);
		});
		
	});
}


// Creates object simulating Node JS arguments, including file path.
function defineArgsObject(pthVal)
{
	var objectRes = [null, null, pthVal];
	return objectRes;
}


// Creates object simulating file system entry.
function defineRetrievedEntry(corrType, sBytes)
{
	var objectRes = {"retrieved": true, "correctType": corrType, "sizeBytes": sBytes};
	return objectRes;
}


// Attempts to retrieve file system entry in 'try-catch' structure.
function callUnknownFile()
{
	var fileRetrieved = false;
	var correctError = false;
	
	try
	{
		// Retrieve entry.
		inputFile.getEntry(invalidFilePath);
		fileRetrieved = true;
	}
	catch(fsErr)
	{
		// Error caught.
		fileRetrieved = false;
		correctError = fsErr.message.endsWith(unknownErrorText);
	}
	
	// Validate result.
	checkTryCatch(fileRetrieved, correctError, unknownErrorText);
}


// Attempts to validate file system entry.
function callInvalidEntry(entryObj, desiredMessage)
{
	var entryValid = false;
	var correctError = false;
	
	try
	{
		// Validate object.
		entryValid = inputFile.validateEntry(entryObj);
	}
	catch(entryErr)
	{
		// Error caught.
		entryValid = false;
		correctError = entryErr.message.endsWith(desiredMessage);
	}
	
	// Validate result.
	checkTryCatch(entryValid, correctError, desiredMessage);
}


// Attempts to open and read file from path.
function callInvalidRead(rPath, desiredMessage)
{
	var readValid = false;
	var correctError = false;
	
	try
	{
		// Read file.
		inputFile.readContents(rPath);
		readValid = true;
	}
	catch(readErr)
	{
		// Error caught.
		readValid = false;
		correctError = readErr.message.endsWith(desiredMessage);
	}
	
	
	// Validate result.
	checkTryCatch(readValid, correctError, desiredMessage);
}


// Tests retrieved file system entry object.
function checkEntry(entryObj, useFile)
{
	expect(entryObj).to.not.be.undefined;
	expect(entryObj).to.not.be.null;
	expect(entryObj).to.be.an("object");
	
	expect(entryObj).to.have.property("retrieved");
	expect(entryObj).to.have.property("correctType");
	expect(entryObj).to.have.property("sizeBytes");
	
	expect(entryObj.retrieved).to.be.true;
	expect(entryObj.correctType).to.equal(useFile);
}


// Validates file size number.
function checkFileSize(sBytes)
{
	var correctType = Number.isInteger(sBytes);
	var checkRes = false;
	
	if (correctType === true && sBytes > 0)
	{
		checkRes = true;
	}
	else
	{
		throw new Error("File size must be a positive, whole number.");
	}
	
	return checkRes;
}


// Validates the result of a 'try-catch' unit test.
function checkTryCatch(trySuccessful, messageCorrect, expMsgTxt)
{
	if (trySuccessful === true)
	{
		// No error.
		throw new Error("No error was thrown.");
	}
	else if (messageCorrect === true)
	{
		// Valid.
		expect(true).to.be.true;
	}
	else
	{
		// Wrong error.
		flagIncorrectError(expMsgTxt);
	}
}


// Incorrect error thrown in 'try-catch'
function flagIncorrectError(vExp)
{
	var preparedText = ["Incorrect file system error thrown\r\n", "Should had ended with: '", vExp, "'"].join("");
	throw new Error(preparedText);
}

module.exports = runTests;