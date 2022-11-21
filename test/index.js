// Main unit testing script.

const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const testInputFunctions = require("../test-parts/test-input-functions");
const testGraphParse = require("../test-parts/test-graph-parse");
const testExactRoute = require("../test-parts/test-exact-route");
const testShortestRoute = require("../test-parts/test-shortest-route");
const testPossibleRoutes = require("../test-parts/test-possible-routes");
const testSubmission = require("../test-parts/test-submission");

runUnitTests();


function runUnitTests()
{
	testInputFunctions();
	testGraphParse();
	testExactRoute();
	testShortestRoute();
	testPossibleRoutes();
	testSubmission();
}