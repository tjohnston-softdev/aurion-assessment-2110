// 'Entry Validation' for input file unit tests.

const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const inputFile = require("../../src/input-file");
const errorThrowing = require("../../src/test-common/error-throwing");

// Main function
function callEntryValidationTests()
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



// Creates object simulating file system entry.
function defineRetrievedEntry(corrType, sBytes)
{
	return {"retrieved": true, "correctType": corrType, "sizeBytes": sBytes};
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
	errorThrowing.checkTryCatch(entryValid, correctError, desiredMessage);
}



module.exports =
{
	callTests: callEntryValidationTests
};