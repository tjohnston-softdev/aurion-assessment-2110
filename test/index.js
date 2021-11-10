// Main unit testing script.

const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const modeInput = require("../test-parts/mode-input");
const testInputFunctions = require("../test-parts/test-input-functions");
const testGraphParse = require("../test-parts/test-graph-parse");
const testPathfindingInput = require("../test-parts/test-pathfinding-input");
const testSubmission = require("../test-parts/test-submission");

runUnitTests();

/*
describe("Unit Tests", function()
{
	testInputFunctions();
	testGraphParse();
	testPathfindingInput();
	testSubmission();
});
*/


function runUnitTests()
{
	var enteredMode = modeInput.readArg(process.argv);
	
	if (enteredMode === "--input")
	{
		testInputFunctions();
	}
	else if (enteredMode === "--parse")
	{
		testGraphParse();
	}
	else if (enteredMode === "--pathfinding")
	{
		testPathfindingInput();
	}
	else if (enteredMode === "--submission")
	{
		testSubmission();
	}
	else
	{
		console.log("Unknown test mode");
	}
	
}