const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const possibleRoutes = require("../../../src/possible-routes");
const testScenarios = require("../../../src/common/enum/possible-route-tests");
const numSigns = require("../../../src/common/enum/num-signs");
const routeCriteria = require("../../../src/common/route-criteria");
const routeResults = require("../../../src/test-common/possible-route-results");
const routeCheckParameters = require("../../../src/test-common/route-check-parameters");
const exampleGraphObject = require("../../../src/test-common/graph-input");
const possibleRouteTemplates = require("../../../src/test-common/possible-route-templates");


function callTemplateTests()
{
	describe("Templates", function()
	{
		it("Exact", function()
		{
			var routeTemplate = routeCriteria.defineTemplate("^AEBFD$", false);
			var routeOneWay = routeCriteria.defineOneWay();
			
			var searchCriteria = [routeTemplate, routeOneWay];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			
			routeResults.checkObject(resultValue, exampleGraphObject, null, null);
			expect(resultValue.length).to.equal(1);
			possibleRouteTemplates.followExact(resultValue, exampleGraphObject.nodes);
		});
	});
}



module.exports =
{
	callTests: callTemplateTests
};