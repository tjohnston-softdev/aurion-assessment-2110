// Invalid data cases for graph parsing unit tests.

const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const parseGraph = require("../../src/parse-graph");
const errorThrowing = require("../../src/test-common/error-throwing");

// Main function
function callInvalidCaseTests()
{
	var formatErrorText = "Could not parse input into a valid graph.";
	var arrayErrorText = "Parsed graph must have multiple nodes and edges.";
	
	describe("Invalid Cases", function()
	{
		it("Invalid Type", function()
		{
			callInvalidEntry(null, "Cannot read properties of null (reading 'replace')");
		});
		
		it("Empty String", function()
		{
			callInvalidEntry("", formatErrorText);
		});
		
		it("Wrong String Format", function()
		{
			callInvalidEntry("Not Graph: XYZ", formatErrorText);
		});
		
		it("Single Edge Entry", function()
		{
			callInvalidEntry("AB1", formatErrorText);
		});
		
		it("Single Edge Output", function()
		{
			callInvalidEntry("AB1, AB2, AB3", arrayErrorText);
		});
		
		it("Single Node", function()
		{
			callInvalidEntry("AA1, AA2, AA3", arrayErrorText);
		});
		
		it("Single Node And Edge", function()
		{
			callInvalidEntry("AA4", formatErrorText);
		});
		
		it("Missing Destination", function()
		{
			callInvalidEntry("AB2, C3, DE4", formatErrorText);
		});
		
		it("Missing Distance", function()
		{
			callInvalidEntry("AB1, CD, EF3", formatErrorText);
		});
		
		it("Negative Distance", function()
		{
			callInvalidEntry("AB5, CD1, EF-5", formatErrorText);
		});
		
		it("Decimal Distance", function()
		{
			callInvalidEntry("AB1, CD1.5, EF2", formatErrorText);
		});
		
		it("Unsupported Node Character", function()
		{
			callInvalidEntry("QR2, $T3", formatErrorText);
		});
		
		it("Unsupported Distance Character", function()
		{
			callInvalidEntry("UV8, TSx", formatErrorText);
		});
		
		
	});
}


// Attempts to parse graph using 'try-catch' structure.
function callInvalidEntry(entryStr, desiredMessage)
{
	var parseSuccessful = false;
	var correctError = false;
	
	try
	{
		// Parse input.
		parseGraph.performParsing(entryStr);
		parseSuccessful = true;
	}
	catch(parseErr)
	{
		// Error caught.
		parseSuccessful = false;
		correctError = parseErr.message.startsWith(desiredMessage);
	}
	
	errorThrowing.checkTryCatch(parseSuccessful, correctError, desiredMessage);
}



module.exports =
{
	callTests: callInvalidCaseTests
};