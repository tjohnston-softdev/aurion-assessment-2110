const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const possibleRoutes = require("../src/possible-routes");
const numSigns = require("../src/common/enum/num-signs");
const routeCriteria = require("../src/common/route-criteria");
const errorThrowing = require("../src/test-common/error-throwing");
const nullGraph = require("../src/test-common/null-graph");
const pathfindingHelp = require("../src/test-common/pathfinding-help");
const exampleGraphObject = require("../src/test-common/graph-input");


function runTests()
{
	describe("Possible Routes", function()
	{
		it("PLACEHOLDER", function()
		{
			expect(true).to.be.true;
		});
	});
}