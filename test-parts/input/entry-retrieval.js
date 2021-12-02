const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const inputFile = require("../../src/input-file");
const fileSize = require("../../src/test-common/file-size");
const errorThrowing = require("../../src/test-common/error-throwing");


function callEntryRetrievalTests(inpDataObj)
{
	describe("Get Input File Entry", function()
	{
		it("Valid File Path", function()
		{
			var resultValue = inputFile.getEntry(inpDataObj.valid);
			checkEntry(resultValue, true);
			fileSize.checkBytes(resultValue.sizeBytes);
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
			callUnknownFile(inpDataObj);
		});
		
	});
}


// Attempts to retrieve file system entry in 'try-catch' structure.
function callUnknownFile(inpData)
{
	var fileRetrieved = false;
	var correctError = false;
	
	try
	{
		// Retrieve entry.
		inputFile.getEntry(inpData.invalid);
		fileRetrieved = true;
	}
	catch(fsErr)
	{
		// Error caught.
		fileRetrieved = false;
		correctError = fsErr.message.endsWith(inpData.unknownErrorText);
	}
	
	// Validate result.
	errorThrowing.checkTryCatch(fileRetrieved, correctError, inpData.unknownErrorText);
}


// Tests retrieved file system entry object.
function checkEntry(entryObj, useFile)
{
	expect(entryObj).to.exist;
	expect(entryObj).to.be.an("object");
	
	expect(entryObj).to.have.property("retrieved");
	expect(entryObj).to.have.property("correctType");
	expect(entryObj).to.have.property("sizeBytes");
	
	expect(entryObj.retrieved).to.be.true;
	expect(entryObj.correctType).to.equal(useFile);
}



module.exports =
{
	callTests: callEntryRetrievalTests
};