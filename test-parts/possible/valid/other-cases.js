// Other valid tests for 'possible routes'

const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const possibleRoutes = require("../../../src/possible-routes");
const routeCriteria = require("../../../src/common/route-criteria");
const exampleGraphObject = require("../../../src/test-common/graph-input");


function callOtherTestCases()
{
	describe("Arguments", function()
	{
		it("Empty Criteria", function()
		{
			var searchCriteria = [];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			expect(resultValue).to.equal(Number.POSITIVE_INFINITY);
		});
		
		it("Impossible Route", function()
		{
			var routeStart = routeCriteria.defineStartNode("A");
			var routeEnd = routeCriteria.defineEndNode("G");
			
			var searchCriteria = [routeStart, routeEnd];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			expect(resultValue).to.be.an("array").that.is.empty;
		});
	});
}


module.exports =
{
	callTests: callOtherTestCases
};