// Unit tests for pathfinding input values.

const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const parseGraph = require("../src/parse-graph");
const exactRoute = require("../src/exact-route");
const shortestRoute = require("../src/shortest-route");
const possibleRoutes = require("../src/possible-routes");
const numSigns = require("../src/common/enum/num-signs");
const graphTasks = require("../src/common/graph-tasks");
const routeCriteria = require("../src/common/route-criteria");
const errorThrowing = require("../src/test-common/error-throwing");
const pathfindingHelp = require("../src/test-common/pathfinding-help");
const exampleGraphObject = require("../src/test-common/graph-input");

const unknownNodesMsg = graphTasks.getUnknownNodesText();
const noRouteMsg = graphTasks.getNoRouteText();



// Main function.
function runTests()
{
	describe("Invalid Pathfinding Input", function()
	{
		handleExactRoute();
		handleShortestRoute();
		//handlePossibleRoutes();
	});
}



// Exact route.
function handleExactRoute()
{
	describe("Exact Route", function()
	{
		var tooShortMsg = "PATH MUST HAVE AT LEAST TWO NODES";
		var stringMsg = "PATH MUST BE A VALID STRING";
		
		it("Correct Output", function()
		{
			var resultValue = exactRoute.getDistance(exampleGraphObject, "AEBA");
			pathfindingHelp.checkOutputDistance(resultValue);
		});
		
		it("Missing Graph", function()
		{
			callExactRouteMissingGraph();
		});
		
		it("Missing Route String", function()
		{
			var resultValue = exactRoute.getDistance(exampleGraphObject, null);
			expect(resultValue).to.equal(stringMsg);
		});
		
		it("Empty Route String", function()
		{
			var resultValue = exactRoute.getDistance(exampleGraphObject, "");
			expect(resultValue).to.equal(tooShortMsg);
		});
		
		it("Single Node Route", function()
		{
			var resultValue = exactRoute.getDistance(exampleGraphObject, "A");
			expect(resultValue).to.equal(tooShortMsg);
		});
		
		it("Unknown Route", function()
		{
			var resultValue = exactRoute.getDistance(exampleGraphObject, "ABCDEF");
			expect(resultValue).to.equal(noRouteMsg);
		});
		
		it("Missing Nodes", function()
		{
			var resultValue = exactRoute.getDistance(exampleGraphObject, "ACEGFMO");
			expect(resultValue).to.equal(noRouteMsg);
		});
		
	});
}


// Shortest route.
function handleShortestRoute()
{
	describe("Shortest Route", function()
	{
		it("Correct Output - Open", function()
		{
			var resultValue = shortestRoute.findRoute(exampleGraphObject, "A", "F");
			pathfindingHelp.checkOutputDistance(resultValue);
		});
		
		it("Correct Output - Closed", function()
		{
			var resultValue = shortestRoute.findRoute(exampleGraphObject, "C", "C");
			pathfindingHelp.checkOutputDistance(resultValue);
		});
		
		
		it("Missing Graph", function()
		{
			callShortestRouteMissingGraph();
		});
		
		it("Missing Node Argument", function()
		{
			var resultValue = shortestRoute.findRoute(exampleGraphObject, "A", null);
			expect(resultValue).to.equal(unknownNodesMsg);
		});
		
		it("Empty Node Argument", function()
		{
			var resultValue = shortestRoute.findRoute(exampleGraphObject, "A", "");
			expect(resultValue).to.equal(unknownNodesMsg);
		});
		
		it("Unknown Node", function()
		{
			var resultValue = shortestRoute.findRoute(exampleGraphObject, "A", "Z");
			expect(resultValue).to.equal(unknownNodesMsg);
		});
		
		it("Impossible Route", function()
		{
			var resultValue = shortestRoute.findRoute(exampleGraphObject, "A", "G");
			expect(resultValue).to.equal(noRouteMsg);
		});
		
	});
}


// Possible routes.
function handlePossibleRoutes()
{
	describe("Possible Routes", function()
	{
		var emptyCriteria = null;
		var invalidCriteria = routeCriteria.defineStopCount("Bad number", "Bad sign");
		
		it("Correct Output - Single", function()
		{
			var routeStops = routeCriteria.defineStopCount(1, numSigns.EQUAL);
			var routeDist = routeCriteria.defineTotalDistance(10, numSigns.LESS_EQUAL);
			var searchCriteria = [routeStops, routeDist];
			
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, "A", "C", searchCriteria);
			expect(resultValue).to.equal(1);
		});
		
		it("Correct Output - Multiple", function()
		{
			var routeStops = routeCriteria.defineStopCount(5, numSigns.LESS_EQUAL);
			var searchCriteria = [routeStops];
			
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, "A", "F", searchCriteria);
			pathfindingHelp.checkMultiplePossibleRoutes(resultValue);
		});
		
		it("Correct Output - Zero", function()
		{
			var routeDist = routeCriteria.defineTotalDistance(5, numSigns.LESS_EQUAL);
			var searchCriteria = [routeDist];
			
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, "A", "F", searchCriteria);
			expect(resultValue).to.equal(0);
		});
		
		
		it("Missing Graph", function()
		{
			callPossibleRoutesMissingGraph();
		});
		
		
		it("Missing Node Argument", function()
		{
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, "D", null, emptyCriteria);
			expect(resultValue).to.equal(unknownNodesMsg);
		});
		
		it("Empty Node Argument", function()
		{
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, "", null, emptyCriteria);
			expect(resultValue).to.equal(unknownNodesMsg);
		});
		
		it("Unknown Node", function()
		{
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, "X", "Y", emptyCriteria);
			expect(resultValue).to.equal(unknownNodesMsg);
		});
		
		it("Invalid Criteria Array", function()
		{
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, "A", "B", 12345);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "INPUT MUST BE A VALID ARRAY.");
		});
		
		it("Invalid Criteria Object", function()
		{
			var numberArray = [123, 456, 789];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, "A", "B", numberArray);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "VALUE TYPE NOT ALLOWED.");
		});
		
		it("Unknown Criteria Type", function()
		{
			var routeUnknown = routeCriteria.defineStopCount(5, numSigns.LESS_EQUAL);
			var searchCriteria = [];
			var resultValue = null;
			
			routeUnknown.type = -1;
			searchCriteria.push(routeUnknown);
			
			resultValue = possibleRoutes.findRoutes(exampleGraphObject, "A", "B", searchCriteria);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "UNKNOWN CRITERIA TYPE.");
		});
		
		it("Invalid 'Stop Count' / 'Total Distance' - Not Positive", function()
		{
			var routeStops = routeCriteria.defineStopCount(-10, numSigns.EQUAL);
			var searchCriteria = [routeStops];
			
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, "A", "B", searchCriteria);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "STOP COUNT NUMBER MUST BE POSITIVE.");
		});
		
		it("Invalid 'Stop Count' / 'Total Distance' - Unknown Sign", function()
		{
			var routeDist = routeCriteria.defineTotalDistance(100, "NOT SIGN");
			var searchCriteria = [routeDist];
			
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, "A", "B", searchCriteria);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "TOTAL DISTANCE NUMBER SIGN IS INVALID.");
		});
		
		it("Invalid 'Stop Count' / 'Total Distance' - Number Type", function()
		{
			var routeDist = routeCriteria.defineTotalDistance(123.45, numSigns.GREAT_EQUAL);
			var searchCriteria = [routeDist];
			
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, "A", "B", searchCriteria);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "TOTAL DISTANCE NUMBER MUST BE WHOLE.");
		});
		
		it("Impossible Route", function()
		{
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, "A", "G", emptyCriteria);
			expect(resultValue).to.equal(0);
		});
		
	});
}


// Attempts 'exact route' pathfinding on a missing graph in a 'try-catch' structure.
function callExactRouteMissingGraph()
{
	var graphFound = false;
	var correctError = false;
	
	try
	{
		// Perform pathfinding.
		exactRoute.getDistance(null, "CBFD");
		graphFound = true;
	}
	catch(routeErr)
	{
		// Error caught.
		graphFound = false;
		correctError = (routeErr.message === errorThrowing.nullGraphText);
	}
	
	
	// Validate error message.
	errorThrowing.checkTryCatch(graphFound, correctError, errorThrowing.nullGraphText);
}



// Attempts 'shortest route' pathfinding on a missing graph in a 'try-catch' structure.
function callShortestRouteMissingGraph()
{
	var graphFound = false;
	var correctError = false;
	
	try
	{
		// Perform pathfinding.
		shortestRoute.findRoute(null, "A", "B");
		graphFound = true;
	}
	catch(routeErr)
	{
		// Error caught.
		graphFound = false;
		correctError = (routeErr.message === errorThrowing.nullGraphText);
	}
	
	// Validate error message.
	errorThrowing.checkTryCatch(graphFound, correctError, errorThrowing.nullGraphText);
}



// Attempts 'possible routes' pathfinding on a missing graph in a 'try-catch' structure.
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
		correctError = (routeErr.message === errorThrowing.nullGraphText);
	}
	
	// Validate error message.
	errorThrowing.checkTryCatch(graphFound, correctError, errorThrowing.nullGraphText);
}



module.exports = runTests;