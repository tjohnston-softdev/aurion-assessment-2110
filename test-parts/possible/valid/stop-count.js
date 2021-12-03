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


function callStopCountTests()
{
	describe("Stop Count", function()
	{
		it("Minimum", function()
		{
			var routeStart = routeCriteria.defineStartNode("A");
			var routeEnd = routeCriteria.defineEndNode("E");
			var routeStopCount = routeCriteria.defineStopCount(2, numSigns.GREAT_EQUAL);
			var routeOneWay = routeCriteria.defineOneWay();
			
			var searchCriteria = [routeStart, routeEnd, routeStopCount, routeOneWay];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			var resultParas = routeCheckParameters.defineNumber(2);
			
			routeResults.checkObject(resultValue, exampleGraphObject, testScenarios.STOPS_MIN, resultParas);
		});
		
		it("Maximum", function()
		{
			var routeStart = routeCriteria.defineStartNode("B");
			var routeEnd = routeCriteria.defineEndNode("F");
			var routeStopCount = routeCriteria.defineStopCount(5, numSigns.LESS_EQUAL);
			
			var searchCriteria = [routeStart, routeEnd, routeStopCount];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			var resultParas = routeCheckParameters.defineNumber(5);
			
			routeResults.checkObject(resultValue, exampleGraphObject, testScenarios.STOPS_MAX, resultParas);
		});
		
		it("Exact", function()
		{
			var routeStart = routeCriteria.defineStartNode("B");
			var routeEnd = routeCriteria.defineEndNode("E");
			var routeStopCount = routeCriteria.defineStopCount(3, numSigns.EQUAL);
			
			var searchCriteria = [routeStart, routeEnd, routeStopCount];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			var resultParas = routeCheckParameters.defineNumber(3);
			
			routeResults.checkObject(resultValue, exampleGraphObject, testScenarios.STOPS_EXACT, resultParas);
		});
		
		it("Between", function()
		{
			var routeStart = routeCriteria.defineStartNode("A");
			var routeEnd = routeCriteria.defineEndNode("C");
			var routeStopMin = routeCriteria.defineStopCount(3, numSigns.GREAT_EQUAL);
			var routeStopMax = routeCriteria.defineStopCount(6, numSigns.LESS_EQUAL);
			
			var searchCriteria = [routeStart, routeEnd, routeStopMin, routeStopMax];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			var resultParas = routeCheckParameters.defineRange(3, 6);
			
			routeResults.checkObject(resultValue, exampleGraphObject, testScenarios.STOPS_BETWEEN, resultParas);
		});
	});
}



module.exports =
{
	callTests: callStopCountTests
};