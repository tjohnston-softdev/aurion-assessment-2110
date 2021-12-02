// Unit testing for input-related functions.

const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const pathArgs = require("./input/path-arg");
const entryRetrieval = require("./input/entry-retrieval");
const entryValidation = require("./input/entry-validation");
const fileReading = require("./input/file-reading");

const inputDataObject = defineInputData();


// Main function.
function runTests()
{
	describe("Input File", function()
	{
		pathArgs.callTests();
		entryRetrieval.callTests(inputDataObject);
		entryValidation.callTests();
		fileReading.callTests(inputDataObject);
	});
}


function defineInputData()
{
	var defineRes = {};
	
	defineRes["valid"] = "./submission.js"
	defineRes["invalid"] = "./unknown.txt";
	defineRes["unknownErrorText"] = "- no such file or directory.";
	
	return defineRes;
}

module.exports = runTests;