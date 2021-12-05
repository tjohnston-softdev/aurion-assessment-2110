// Route count tests for 'possible routes'

const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const possibleRoutes = require("../../../src/possible-routes");
const numSigns = require("../../../src/common/enum/num-signs");
const routeCriteria = require("../../../src/common/route-criteria");
const pathfindingHelp = require("../../../src/test-common/pathfinding-help");
const routeResults = require("../../../src/test-common/possible-route-results");
const exampleGraphObject = require("../../../src/test-common/graph-input");


function callRouteCountTests()
{
	describe("Route Count", function()
	{
		it("Single", function()
		{
			var routeStart = routeCriteria.defineStartNode("A");
			var routeEnd = routeCriteria.defineEndNode("C");
			var routeStopCount = routeCriteria.defineStopCount(1, numSigns.EQUAL);
			var routeDist = routeCriteria.defineTotalDistance(10, numSigns.LESS_EQUAL);
			
			var searchCriteria = [routeStart, routeEnd, routeStopCount, routeDist];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			
			routeResults.checkObject(resultValue, exampleGraphObject, null, null);
			expect(resultValue.length).to.equal(1);
		});
		
		it("Multiple", function()
		{
			var routeStart = routeCriteria.defineStartNode("A");
			var routeEnd = routeCriteria.defineEndNode("F");
			var routeStopCount = routeCriteria.defineStopCount(5, numSigns.LESS_EQUAL);
			
			var searchCriteria = [routeStart, routeEnd, routeStopCount];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			
			routeResults.checkObject(resultValue, exampleGraphObject, null, null);
			pathfindingHelp.checkMultiplePossibleRoutes(resultValue.length);
		});
		
		it("Zero", function()
		{
			var routeStart = routeCriteria.defineStartNode("A");
			var routeEnd = routeCriteria.defineEndNode("F");
			var routeDist = routeCriteria.defineTotalDistance(5, numSigns.LESS_EQUAL);
			
			var searchCriteria = [routeStart, routeEnd, routeDist];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			expect(resultValue).to.equal(0);
		});
		
		it("Infinite", function()
		{
			var routeStart = routeCriteria.defineStartNode("A");
			var routeEnd = routeCriteria.defineEndNode("C");
			var routeDist = routeCriteria.defineTotalDistance(50, numSigns.GREAT_EQUAL);
			
			var searchCriteria = [routeStart, routeEnd, routeDist];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			expect(resultValue).to.equal(Number.POSITIVE_INFINITY);
		});
	});
}


module.exports =
{
	callTests: callRouteCountTests
};