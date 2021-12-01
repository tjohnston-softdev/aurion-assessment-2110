const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const possibleRoutes = require("../src/possible-routes");
const numSigns = require("../src/common/enum/num-signs");
const testScenarios = require("../src/common/enum/possible-route-tests");
const routeCriteria = require("../src/common/route-criteria");
const pathfindingHelp = require("../src/test-common/pathfinding-help");
const routeResults = require("../src/test-common/possible-route-results");
const routeCheckParameters = require("../src/test-common/route-check-parameters");
const exampleGraphObject = require("../src/test-common/graph-input");

// Main function.
function runTests()
{
	describe("Possible Routes - Valid", function()
	{
		handleOneWay();
		handleStartEndNodes();
		//handleArguments();
		//handleRouteCount();
	});
}


function handleOneWay()
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


function handleStartEndNodes()
{
	describe("Start-End Nodes", function()
	{
		var allNodes = "ABCDEFGH";
		
		it("One-To-One", function()
		{
			var routeStart = routeCriteria.defineStartNode("A");
			var routeEnd = routeCriteria.defineEndNode("C");
			var routeOneWay = routeCriteria.defineOneWay();
			
			var searchCriteria = [routeStart, routeEnd, routeOneWay];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			var resultParas = routeCheckParameters.defineStartEnd("A", "C", exampleGraphObject.nodes);
			
			routeResults.checkObject(resultValue, exampleGraphObject, testScenarios.ROUTE_TYPE, resultParas);
		});
		
		it("One-To-Multiple", function()
		{
			var routeStart = routeCriteria.defineStartNode("A");
			var routeEndD = routeCriteria.defineEndNode("D");
			var routeEndE = routeCriteria.defineEndNode("E");
			var routeOneWay = routeCriteria.defineOneWay();
			
			var searchCriteria = [routeStart, routeEndD, routeEndE, routeOneWay];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			var resultParas = routeCheckParameters.defineStartEnd("A", "DE", exampleGraphObject.nodes);
			
			routeResults.checkObject(resultValue, exampleGraphObject, testScenarios.ROUTE_TYPE, resultParas);
		});
		
		it("One-To-All", function()
		{
			var routeStart = routeCriteria.defineStartNode("C");
			var routeOneWay = routeCriteria.defineOneWay();
			
			var searchCriteria = [routeStart, routeOneWay];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			var resultParas = routeCheckParameters.defineStartEnd("C", allNodes, exampleGraphObject.nodes);
			
			routeResults.checkObject(resultValue, exampleGraphObject, testScenarios.ROUTE_TYPE, resultParas);
		});
		
		it("Multiple-To-One", function()
		{
			var routeStartA = routeCriteria.defineStartNode("A");
			var routeStartB = routeCriteria.defineStartNode("B");
			var routeStartC = routeCriteria.defineStartNode("C");
			var routeEnd = routeCriteria.defineEndNode("F");
			var routeOneWay = routeCriteria.defineOneWay();
			
			var searchCriteria = [routeStartA, routeStartB, routeStartC, routeEnd, routeOneWay];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			var resultParas = routeCheckParameters.defineStartEnd("ABC", "F", exampleGraphObject.nodes);
			
			routeResults.checkObject(resultValue, exampleGraphObject, testScenarios.ROUTE_TYPE, resultParas);
		});
		
		it("Multiple-To-Multiple", function()
		{
			var routeStartA = routeCriteria.defineStartNode("A");
			var routeStartB = routeCriteria.defineStartNode("B");
			var routeEndC = routeCriteria.defineEndNode("C");
			var routeEndD = routeCriteria.defineEndNode("D");
			var routeOneWay = routeCriteria.defineOneWay();
			
			var searchCriteria = [routeStartA, routeStartB, routeEndC, routeEndD, routeOneWay];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			var resultParas = routeCheckParameters.defineStartEnd("AB", "CD", exampleGraphObject.nodes);
			
			routeResults.checkObject(resultValue, exampleGraphObject, testScenarios.ROUTE_TYPE, resultParas);
		});
		
		it("Multiple-To-All", function()
		{
			var routeStartA = routeCriteria.defineStartNode("A");
			var routeStartB = routeCriteria.defineStartNode("B");
			var routeOneWay = routeCriteria.defineOneWay();
			
			var searchCriteria = [routeStartA, routeStartB, routeOneWay];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			var resultParas = routeCheckParameters.defineStartEnd("AB", allNodes, exampleGraphObject.nodes);
		});
		
		it("All-To-One", function()
		{
			var routeEnd = routeCriteria.defineEndNode("B");
			var routeOneWay = routeCriteria.defineOneWay();
			
			var searchCriteria = [routeEnd, routeOneWay];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			var resultParas = routeCheckParameters.defineStartEnd(allNodes, "B", exampleGraphObject.nodes);
		});
		
		it("All-To-Multiple", function()
		{
			var routeEndB = routeCriteria.defineEndNode("B");
			var routeEndC = routeCriteria.defineEndNode("C");
			var routeOneWay = routeCriteria.defineOneWay();
			
			var searchCriteria = [routeEndB, routeEndC, routeOneWay];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			var resultParas = routeCheckParameters.defineStartEnd(allNodes, "BC", exampleGraphObject.nodes);
		});
		
		it("All-To-All", function()
		{
			var routeOneWay = routeCriteria.defineOneWay();
			var searchCriteria = [routeOneWay];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			var resultParas = routeCheckParameters.defineStartEnd(allNodes, allNodes, exampleGraphObject.nodes);
		});
		
		
		
	});
}



function handleArguments()
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
			expect(resultValue).to.equal(0);
		});
	});
}



function handleRouteCount()
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
			expect(resultValue.length).to.equal(1);
		});
		
		it("Multiple", function()
		{
			var routeStart = routeCriteria.defineStartNode("A");
			var routeEnd = routeCriteria.defineEndNode("F");
			var routeStopCount = routeCriteria.defineStopCount(5, numSigns.LESS_EQUAL);
			
			var searchCriteria = [routeStart, routeEnd, routeStopCount];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
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



module.exports = runTests;