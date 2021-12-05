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
			
			var resultCount = handlePathfinding(searchCriteria, testScenarios.TEMPLATE_EXACT);
			expect(resultCount).to.equal(1);
		});
		
		it("Wildcard", function()
		{
			var routeTemplate = routeCriteria.defineTemplate("A..C$", false);
			var routeDist = routeCriteria.defineTotalDistance(40, numSigns.LESS_EQUAL);
			var searchCriteria = [routeTemplate, routeDist];
			
			handlePathfinding(searchCriteria, testScenarios.TEMPLATE_WILDCARD);
		});
		
		it("Repeating Sequence", function()
		{
			var routeTemplate = routeCriteria.defineTemplate("EAC", true);
			var routeDist = routeCriteria.defineTotalDistance(40, numSigns.LESS_EQUAL);
			var searchCriteria = [routeTemplate, routeDist];
			
			handlePathfinding(searchCriteria, testScenarios.TEMPLATE_SEQUENCE);
		});
		
		it("Choice", function()
		{
			var routeTemplate = routeCriteria.defineTemplate("^..[ABC](.)*$", true);
			var routeOneWay = routeCriteria.defineOneWay();
			var searchCriteria = [routeTemplate, routeOneWay];
			
			handlePathfinding(searchCriteria, testScenarios.TEMPLATE_CHOICE);
		});
		
		it("Invert", function()
		{
			var routeTemplate = routeCriteria.defineTemplate("^.[^AB].[^DE](.)*$", true);
			var routeOneWay = routeCriteria.defineOneWay();
			var searchCriteria = [routeTemplate, routeOneWay];
			
			handlePathfinding(searchCriteria, testScenarios.TEMPLATE_INVERT);
		});
		
		
		
	});
}


function handlePathfinding(testCriteria, testFlag)
{
	var searchResultObject = possibleRoutes.findRoutes(exampleGraphObject, testCriteria);
	
	routeResults.checkObject(searchResultObject, exampleGraphObject, null, null);
	possibleRouteTemplates.checkObject(searchResultObject, exampleGraphObject.nodes, testFlag);
	
	return searchResultObject.length;
}



module.exports =
{
	callTests: callTemplateTests
};