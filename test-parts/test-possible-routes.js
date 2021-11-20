const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const possibleRoutes = require("../src/possible-routes");
const numSigns = require("../src/common/enum/num-signs");
const graphTasks = require("../src/common/graph-tasks");
const routeCriteria = require("../src/common/route-criteria");
const errorThrowing = require("../src/test-common/error-throwing");
const nullGraph = require("../src/test-common/null-graph");
const pathfindingHelp = require("../src/test-common/pathfinding-help");
const exampleGraphObject = require("../src/test-common/graph-input");


// Main Function
function runTests()
{
	describe("Possible Routes", function()
	{
		var unknownNodesMsg = graphTasks.getUnknownNodesText();
		
		it("Correct Output - Single", function()
		{
			var routeStart = routeCriteria.defineStartNode("A");
			var routeEnd = routeCriteria.defineEndNode("C");
			var routeStopCount = routeCriteria.defineStopCount(1, numSigns.EQUAL);
			var routeDist = routeCriteria.defineTotalDistance(10, numSigns.LESS_EQUAL);
			
			var searchCriteria = [routeStart, routeEnd, routeStopCount, routeDist];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			expect(resultValue).to.equal(1);
		});
		
		it("Correct Output - Multiple", function()
		{
			var routeStart = routeCriteria.defineStartNode("A");
			var routeEnd = routeCriteria.defineEndNode("F");
			var routeStopCount = routeCriteria.defineStopCount(5, numSigns.LESS_EQUAL);
			
			var searchCriteria = [routeStart, routeEnd, routeStopCount];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			pathfindingHelp.checkMultiplePossibleRoutes(resultValue);
		});
		
		it("Correct Output - Zero", function()
		{
			var routeStart = routeCriteria.defineStartNode("A");
			var routeEnd = routeCriteria.defineEndNode("F");
			var routeDist = routeCriteria.defineTotalDistance(5, numSigns.LESS_EQUAL);
			
			var searchCriteria = [routeStart, routeEnd, routeDist];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			expect(resultValue).to.equal(0);
		});
		
		
		it("Missing Graph", function()
		{
			callPossibleRoutesMissingGraph();
		});
		
		it("Invalid Criteria Array", function()
		{
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, 12345);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "INPUT MUST BE A VALID ARRAY.");
		});
		
		it("Invalid Criteria Object", function()
		{
			var numberArray = [123, 456, 789];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, numberArray);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "VALUE TYPE NOT ALLOWED.");
		});
		
		it("Unknown Criteria Type", function()
		{
			var routeUnknown = routeCriteria.defineStopCount(5, numSigns.LESS_EQUAL);
			var searchCriteria = [];
			var resultValue = null;
			
			routeUnknown.type = -1;
			searchCriteria.push(routeUnknown);
			
			resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "UNKNOWN CRITERIA TYPE.");
		});
		
		it("Empty Criteria", function()
		{
			var searchCriteria = [];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			expect(resultValue).to.equal(Number.POSITIVE_INFINITY);
		});
		
		
		it("Invalid Node - Value Type", function()
		{
			var invalidObject = routeCriteria.defineStartNode(-1);
			var searchCriteria = [invalidObject];
			
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "START NODE MUST BE A VALID, NON-EMPTY STRING.");
		});
		
		it("Invalid Node - Empty", function()
		{
			var invalidObject = routeCriteria.defineEndNode("");
			var searchCriteria = [invalidObject];
			
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "END NODE MUST BE A VALID, NON-EMPTY STRING.");
		});
		
		it("Invalid Node - Unknown", function()
		{
			var invalidObject = routeCriteria.defineStartNode("X");
			var searchCriteria = [invalidObject];
			
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "START NODE NODE DOES NOT EXIST.");
		});
		
		it("Invalid 'Stop Count' / 'Total Distance' - Not Positive", function()
		{
			var routeStopCount = routeCriteria.defineStopCount(-10, numSigns.EQUAL);
			var searchCriteria = [routeStopCount];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "STOP COUNT NUMBER MUST BE POSITIVE.");
		});
		
		it("Invalid 'Stop Count' / 'Total Distance' - Unknown Sign", function()
		{
			var routeDist = routeCriteria.defineTotalDistance(100, "NOT SIGN");
			var searchCriteria = [routeDist];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "TOTAL DISTANCE NUMBER SIGN IS INVALID.");
		});
		
		it("Invalid 'Stop Count' / 'Total Distance' - Number Type", function()
		{
			var routeDist = routeCriteria.defineTotalDistance(123.45, numSigns.GREAT_EQUAL);
			var searchCriteria = [routeDist];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "TOTAL DISTANCE NUMBER MUST BE WHOLE.");
		});
		
		it("Impossible Route", function()
		{
			var routeStart = routeCriteria.defineStartNode("A");
			var routeEnd = routeCriteria.defineEndNode("G");
			
			var searchCriteria = [routeStart, routeEnd];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			expect(resultValue).to.equal(0);
		});
		
		it("Infinite Routes", function()
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



// Attempts pathfinding on a missing graph.
function callPossibleRoutesMissingGraph()
{
	var graphFound = false;
	var correctError = false;
	
	try
	{
		// Perform pathfinding.
		possibleRoutes.findRoutes(null, "A", "B", null);
		graphFound = true;
	}
	catch(routeErr)
	{
		// Error caught.
		graphFound = false;
		correctError = (routeErr.message === nullGraph.msgTxt);
	}
	
	// Validate error message.
	errorThrowing.checkTryCatch(graphFound, correctError, nullGraph.msgTxt);
}



module.exports = runTests;