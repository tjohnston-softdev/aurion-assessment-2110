// Unit tests for 'possible routes' pathfinding.

const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const validOneWay = require("./possible/valid/one-way");
const validStartEnd = require("./possible/valid/start-end");
const validStopCount = require("./possible/valid/stop-count");
const validTotalDist = require("./possible/valid/total-dist");
const validTemplateCriteria = require("./possible/valid/template-criteria");
const validRouteCount = require("./possible/valid/route-count");
const validOther = require("./possible/valid/other-cases");
const invalidNodeCriteria = require("./possible/invalid/node-criteria");
const invalidSearchArgs = require("./possible/invalid/search-args");
const invalidStopDistCriteria = require("./possible/invalid/stop-dist-criteria");
const invalidTemplateCriteria = require("./possible/invalid/template-criteria");


// Main function
function runTests()
{
	describe("Possible Routes", function()
	{
		handleValidGroup();
		handleInvalidGroup();
	});
}


// Valid tests
function handleValidGroup()
{
	describe("Valid", function()
	{
		validOneWay.callTest();
		validStartEnd.callTests();
		validStopCount.callTests();
		validTotalDist.callTests();
		validTemplateCriteria.callTests();
		validRouteCount.callTests();
		validOther.callTests();
	});
}


// Invalid tests
function handleInvalidGroup()
{
	describe("Invalid", function()
	{
		invalidSearchArgs.callTests();
		invalidNodeCriteria.callTests();
		invalidStopDistCriteria.callTests();
		invalidTemplateCriteria.callTests();
	});
}

module.exports = runTests;