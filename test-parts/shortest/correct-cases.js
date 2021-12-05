// Correct cases for 'shortest route' unit tests.

const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const shortestRoute = require("../../src/shortest-route");
const pathfindingHelp = require("../../src/test-common/pathfinding-help");
const exampleGraphObject = require("../../src/test-common/graph-input");


function callCorrectTestCases()
{
	describe("Correct Output", function()
	{
		it("Open", function()
		{
			var resultValue = shortestRoute.findRoute(exampleGraphObject, "A", "F");
			pathfindingHelp.checkOutputDistance(resultValue);
		});
		
		it("Closed", function()
		{
			var resultValue = shortestRoute.findRoute(exampleGraphObject, "C", "C");
			pathfindingHelp.checkOutputDistance(resultValue);
		});
	});
}



module.exports =
{
	callTests: callCorrectTestCases
};