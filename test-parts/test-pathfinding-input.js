// Unit tests for pathfinding input values.

const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const parseGraph = require("../src/parse-graph");
const exactRoute = require("../src/exact-route");
const shortestRoute = require("../src/shortest-route");
const possibleRoutes = require("../src/possible-routes");
const numSigns = require("../src/common/enum/num-signs");
const routeCriteria = require("../src/common/route-criteria");
const errorThrowing = require("../src/test-common/error-throwing");
const pathfindingHelp = require("../src/test-common/pathfinding-help");

const graphErrMsg = "Cannot read property 'nodes' of null";
const unknownNodesMsg = "UNKNOWN NODES";
const noRouteMsg = "NO SUCH ROUTE";
const badCriteriaMsg = "INVALID COUNT CRITERIA";

// Example graph that will be used for these tests.
var exampleGraph = null;



// Main function.
function runTests()
{
	describe("Invalid Pathfinding Input", function()
	{
		prepareExampleGraph();
		handleExactRoute();
		handleShortestRoute();
		handlePossibleRoutes();
		disposeExampleGraph();
	});
}


// Creates example graph.
function prepareExampleGraph()
{
	describe("Prepare Example Graph", function()
	{
		var inpString = null;
		
		it("String Written", function(done)
		{
			inpString = "AE14, CB13, EB7, EA11, BF10, BE20, BD3, BA1, AC2, FD7, GH9";
			done();
		});
		
		it("Graph Parsed", function(done)
		{
			exampleGraph = parseGraph.performParsing(inpString);
			done();
		});
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
			var resultValue = exactRoute.getDistance(exampleGraph, "AEBA");
			pathfindingHelp.checkOutputDistance(resultValue);
		});
		
		it("Missing Graph", function()
		{
			callExactRouteMissingGraph();
		});
		
		it("Missing Route String", function()
		{
			var resultValue = exactRoute.getDistance(exampleGraph, null);
			expect(resultValue).to.equal(stringMsg);
		});
		
		it("Empty Route String", function()
		{
			var resultValue = exactRoute.getDistance(exampleGraph, "");
			expect(resultValue).to.equal(tooShortMsg);
		});
		
		it("Single Node Route", function()
		{
			var resultValue = exactRoute.getDistance(exampleGraph, "A");
			expect(resultValue).to.equal(tooShortMsg);
		});
		
		it("Unknown Route", function()
		{
			var resultValue = exactRoute.getDistance(exampleGraph, "ABCDEF");
			expect(resultValue).to.equal(noRouteMsg);
		});
		
		it("Missing Nodes", function()
		{
			var resultValue = exactRoute.getDistance(exampleGraph, "ACEGFMO");
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
			var resultValue = shortestRoute.findRoute(exampleGraph, "A", "F");
			pathfindingHelp.checkOutputDistance(resultValue);
		});
		
		it("Correct Output - Closed", function()
		{
			var resultValue = shortestRoute.findRoute(exampleGraph, "C", "C");
			pathfindingHelp.checkOutputDistance(resultValue);
		});
		
		
		it("Missing Graph", function()
		{
			callShortestRouteMissingGraph();
		});
		
		it("Missing Node Argument", function()
		{
			var resultValue = shortestRoute.findRoute(exampleGraph, "A", null);
			expect(resultValue).to.equal(unknownNodesMsg);
		});
		
		it("Empty Node Argument", function()
		{
			var resultValue = shortestRoute.findRoute(exampleGraph, "A", "");
			expect(resultValue).to.equal(unknownNodesMsg);
		});
		
		it("Unknown Node", function()
		{
			var resultValue = shortestRoute.findRoute(exampleGraph, "A", "Z");
			expect(resultValue).to.equal(unknownNodesMsg);
		});
		
		it("Impossible Route", function()
		{
			var resultValue = shortestRoute.findRoute(exampleGraph, "A", "G");
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
			
			var resultValue = possibleRoutes.findRoutes(exampleGraph, "A", "C", searchCriteria);
			expect(resultValue).to.equal(1);
		});
		
		it("Correct Output - Multiple", function()
		{
			var routeStops = routeCriteria.defineStopCount(5, numSigns.LESS_EQUAL);
			var searchCriteria = [routeStops];
			
			var resultValue = possibleRoutes.findRoutes(exampleGraph, "A", "F", searchCriteria);
			pathfindingHelp.checkMultiplePossibleRoutes(resultValue);
		});
		
		it("Correct Output - Zero", function()
		{
			var routeDist = routeCriteria.defineTotalDistance(5, numSigns.LESS_EQUAL);
			var searchCriteria = [routeDist];
			
			var resultValue = possibleRoutes.findRoutes(exampleGraph, "A", "F", searchCriteria);
			expect(resultValue).to.equal(0);
		});
		
		
		it("Missing Graph", function()
		{
			callPossibleRoutesMissingGraph();
		});
		
		
		it("Missing Node Argument", function()
		{
			var resultValue = possibleRoutes.findRoutes(exampleGraph, "D", null, emptyCriteria);
			expect(resultValue).to.equal(unknownNodesMsg);
		});
		
		it("Empty Node Argument", function()
		{
			var resultValue = possibleRoutes.findRoutes(exampleGraph, "", null, emptyCriteria);
			expect(resultValue).to.equal(unknownNodesMsg);
		});
		
		it("Unknown Node", function()
		{
			var resultValue = possibleRoutes.findRoutes(exampleGraph, "X", "Y", emptyCriteria);
			expect(resultValue).to.equal(unknownNodesMsg);
		});
		
		it("Invalid Criteria Array", function()
		{
			var resultValue = possibleRoutes.findRoutes(exampleGraph, "A", "B", 12345);
			//expect(resultValue).to.equal("CRITERIA MUST BE A VALID ARRAY.");
		});
		
		it("Invalid Criteria Object", function()
		{
			var numberArray = [123, 456, 789];
			var resultValue = possibleRoutes.findRoutes(exampleGraph, "A", "B", numberArray);
		});
		
		
		/*
		it("Invalid Distance Criteria", function()
		{
			var resultValue = possibleRoutes.findRoutes(exampleGraph, "A", "B", emptyCriteria, invalidCriteria);
			expect(resultValue).to.equal("INVALID DISTANCE CRITERIA");
		});
		
		it("Invalid Stop Count Criteria", function()
		{
			var resultValue = possibleRoutes.findRoutes(exampleGraph, "A", "B", invalidCriteria, emptyCriteria);
			expect(resultValue).to.equal(badCriteriaMsg);
		});
		
		it("Impossible Route", function()
		{
			var resultValue = possibleRoutes.findRoutes(exampleGraph, "A", "G", emptyCriteria, emptyCriteria);
			expect(resultValue).to.equal(0);
		});
		*/
		
	});
}


// Disposes example graph object after tests complete.
function disposeExampleGraph()
{
	describe("Dispose Example Graph", function()
	{
		it("Successful", function(done)
		{
			exampleGraph = null;
			done();
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
		correctError = (routeErr.message === graphErrMsg);
	}
	
	
	// Validate error message.
	errorThrowing.checkTryCatch(graphFound, correctError, graphErrMsg);
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
		correctError = (routeErr.message === graphErrMsg);
	}
	
	// Validate error message.
	errorThrowing.checkTryCatch(graphFound, correctError, graphErrMsg);
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
		correctError = (routeErr.message === graphErrMsg);
	}
	
	// Validate error message.
	errorThrowing.checkTryCatch(graphFound, correctError, graphErrMsg);
}



module.exports = runTests;