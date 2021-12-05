// Valid 'total distance' criteria tests for 'possible routes'

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


function callDistanceTests()
{
	describe("Total Distance", function()
	{
		it("Minimum", function()
		{
			var routeStart = routeCriteria.defineStartNode("A");
			var routeEnd = routeCriteria.defineEndNode("E");
			var routeDist = routeCriteria.defineTotalDistance(10, numSigns.GREAT_EQUAL);
			var routeOneWay = routeCriteria.defineOneWay();
			
			var searchCriteria = [routeStart, routeEnd, routeDist, routeOneWay];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			var resultParas = routeCheckParameters.defineNumber(10);
			
			routeResults.checkObject(resultValue, exampleGraphObject, testScenarios.DIST_MIN, resultParas);
		});
		
		it("Maximum", function()
		{
			var routeStart = routeCriteria.defineStartNode("B");
			var routeEnd = routeCriteria.defineEndNode("F");
			var routeDist = routeCriteria.defineTotalDistance(20, numSigns.LESS_EQUAL);
			
			var searchCriteria = [routeStart, routeEnd, routeDist];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			var resultParas = routeCheckParameters.defineNumber(20);
			
			routeResults.checkObject(resultValue, exampleGraphObject, testScenarios.DIST_MAX, resultParas);
		});
		
		it("Exact", function()
		{
			var routeStart = routeCriteria.defineStartNode("A");
			var routeEnd = routeCriteria.defineEndNode("B");
			var routeDist = routeCriteria.defineTotalDistance(21, numSigns.EQUAL);
			
			var searchCriteria = [routeStart, routeEnd, routeDist];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			var resultParas = routeCheckParameters.defineNumber(21);
			
			routeResults.checkObject(resultValue, exampleGraphObject, testScenarios.DIST_EXACT, resultParas);
		});
		
		it("Between", function()
		{
			var routeStart = routeCriteria.defineStartNode("A");
			var routeEnd = routeCriteria.defineEndNode("C");
			var routeDistMin = routeCriteria.defineTotalDistance(25, numSigns.GREAT_EQUAL);
			var routeDistMax = routeCriteria.defineTotalDistance(50, numSigns.LESS_EQUAL);
			
			var searchCriteria = [routeStart, routeEnd, routeDistMin, routeDistMax];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			var resultParas = routeCheckParameters.defineRange(25, 50);
			
			routeResults.checkObject(resultValue, exampleGraphObject, testScenarios.DIST_BETWEEN, resultParas);
		});
	});
}



module.exports =
{
	callTests: callDistanceTests
};