// 'File Reading' for input file unit tests.

const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const inputFile = require("../../src/input-file");
const errorThrowing = require("../../src/test-common/error-throwing");

// Main function
function callFileReadTests(inpDataObj)
{
	describe("Read Contents", function()
	{
		it("File", function()
		{
			var resultValue = inputFile.readContents(inpDataObj.valid);
			expect(resultValue).to.be.a("string");
			expect(resultValue.length).to.be.above(0);
		});
		
		it("Folder", function()
		{
			callInvalidRead(".", "- illegal operation on a directory.");
		});
		
		it("Unknown", function()
		{
			callInvalidRead(inpDataObj.invalid, inpDataObj.unknownErrorText);
		});
		
	});
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
	errorThrowing.checkTryCatch(readValid, correctError, desiredMessage);
}



module.exports =
{
	callTests: callFileReadTests
};