const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const possibleRoutes = require("../../../src/possible-routes");
const routeCriteria = require("../../../src/common/route-criteria");
const pathfindingHelp = require("../../../src/test-common/pathfinding-help");
const exampleGraphObject = require("../../../src/test-common/graph-input");


function callNodeCriteriaTests()
{
	describe("Nodes", function()
	{
		it("Value Type", function()
		{
			var invalidObject = routeCriteria.defineStartNode(-1);
			var searchCriteria = [invalidObject];
			
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "START NODE MUST BE A VALID, NON-EMPTY STRING.");
		});
		
		it("Empty", function()
		{
			var invalidObject = routeCriteria.defineEndNode("");
			var searchCriteria = [invalidObject];
			
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "END NODE MUST BE A VALID, NON-EMPTY STRING.");
		});
		
		it("Unknown", function()
		{
			var invalidObject = routeCriteria.defineStartNode("X");
			var searchCriteria = [invalidObject];
			
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "START NODE NODE DOES NOT EXIST.");
		});
	});
}



module.exports =
{
	callTests: callNodeCriteriaTests
};