const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const validOneWay = require("./possible/valid/one-way");
const validStartEnd = require("./possible/valid/start-end");
const validStopCount = require("./possible/valid/stop-count");
const invalidNodeCriteria = require("./possible/invalid/node-criteria");
const invalidSearchArgs = require("./possible/invalid/search-args");
const invalidStopDistCriteria = require("./possible/invalid/stop-dist-criteria");
const invalidTemplateCriteria = require("./possible/invalid/template-criteria");


function runTests()
{
	describe("Possible Routes", function()
	{
		handleValidGroup();
		handleInvalidGroup();
	});
}


function handleValidGroup()
{
	describe("Valid", function()
	{
		validOneWay.callTest();
		validStartEnd.callTests();
		validStopCount.callTests();
	});
}

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