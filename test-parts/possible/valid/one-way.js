const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const possibleRoutes = require("../../../src/possible-routes");
const testScenarios = require("../../../src/common/enum/possible-route-tests");
const routeCriteria = require("../../../src/common/route-criteria");
const routeResults = require("../../../src/test-common/possible-route-results");
const exampleGraphObject = require("../../../src/test-common/graph-input");


function callOneWayTest()
{
	describe("One-Way", function()
	{
		it("Enabled", function()
		{
			var routeOneWay = routeCriteria.defineOneWay();
			var searchCriteria = [routeOneWay];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			routeResults.checkObject(resultValue, exampleGraphObject, testScenarios.ONE_WAY, null);
		});
	});
}


module.exports =
{
	callTest: callOneWayTest
};