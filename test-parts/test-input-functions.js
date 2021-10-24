const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const inputFile = require("../src/input-file");


function runTests()
{
	describe("Input File", function()
	{
		handleArgumentFunction();
		handleGetFileEntry();
	});
}


function handleArgumentFunction()
{
	describe("Read Path Argument", function()
	{
		var defaultValue = "input.txt";
		
		it("Valid Entry", function()
		{
			var enteredPath = "./example-file.txt";
			var argArray = getArgumentsObject(enteredPath);
			var resultValue = inputFile.readPathArg(argArray);
			expect(resultValue).to.equal(enteredPath);
		});
		
		it("Empty String", function()
		{
			var argArray = getArgumentsObject("");
			var resultValue = inputFile.readPathArg(argArray);
			expect(resultValue).to.equal(defaultValue);
		});
		
		it("Invalid Argument Type", function()
		{
			var argArray = getArgumentsObject(-1);
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


function handleGetFileEntry()
{
	describe("Get Input File Entry", function()
	{
		it("Valid File Path", function()
		{
			var resultValue = inputFile.getEntry("./submission.js");
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
			callUnknownFile();
		});
		
	});
}


function getArgumentsObject(pthVal)
{
	var objectRes = [null, null, pthVal];
	return objectRes;
}


function callUnknownFile()
{
	var fileRetrieved = false;
	var correctError = false;
	
	try
	{
		inputFile.getEntry("./unknown.txt");
		fileRetrieved = true;
	}
	catch(fsErr)
	{
		fileRetrieved = false;
		correctError = fsErr.message.endsWith("- no such file or directory.");
	}
	
	expect(fileRetrieved).to.be.false;
	expect(correctError).to.be.true;
	
}


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



module.exports = runTests;