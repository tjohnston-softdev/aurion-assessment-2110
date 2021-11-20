// Main unit testing script.

const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const modeInput = require("../test-parts/mode-input");
const testInputFunctions = require("../test-parts/test-input-functions");
const testGraphParse = require("../test-parts/test-graph-parse");
const testExactRoute = require("../test-parts/test-exact-route");
const testShortestRoute = require("../test-parts/test-shortest-route");
const testPossibleRoutes = require("../test-parts/test-possible-routes");
const testSubmission = require("../test-parts/test-submission");

runUnitTests();


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
	else if (enteredMode === "--exact")
	{
		testExactRoute();
	}
	else if (enteredMode === "--shortest")
	{
		testShortestRoute();
	}
	else if (enteredMode === "--possible")
	{
		testPossibleRoutes();
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