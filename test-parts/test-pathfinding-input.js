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
			checkOutputDistanceNumber(resultValue);
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
			checkOutputDistanceNumber(resultValue);
		});
		
		it("Correct Output - Closed", function()
		{
			var resultValue = shortestRoute.findRoute(exampleGraph, "C", "C");
			checkOutputDistanceNumber(resultValue);
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
			checkMultiplePossibleRoutes(resultValue);
		});
		
		it("Correct Output - Zero", function()
		{
			var routeDist = routeCriteria.defineTotalDistance(5, numSigns.LESS_EQUAL);
			var searchCriteria = [routeDist];
			
			var resultValue = possibleRoutes.findRoutes(exampleGraph, "A", "F", searchCriteria);
			expect(resultValue).to.equal(0);
		});
		
		/*
		it("Missing Graph", function()
		{
			callPossibleRoutesMissingGraph();
		});
		
		it("Missing Node Argument", function()
		{
			var resultValue = possibleRoutes.findRoutes(exampleGraph, "D", null, emptyCriteria, emptyCriteria);
			expect(resultValue).to.equal(unknownNodesMsg);
		});
		
		it("Empty Node Argument", function()
		{
			var resultValue = possibleRoutes.findRoutes(exampleGraph, "", null, emptyCriteria, emptyCriteria);
			expect(resultValue).to.equal(unknownNodesMsg);
		});
		
		it("Unknown Node", function()
		{
			var resultValue = possibleRoutes.findRoutes(exampleGraph, "O", "P", emptyCriteria, emptyCriteria);
			expect(resultValue).to.equal(unknownNodesMsg);
		});
		
		
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
	var givenMessage = "";
	
	try
	{
		// Perform pathfinding.
		exactRoute.getDistance(null, "CBFD");
		givenMessage = "";
	}
	catch(routeErr)
	{
		// Error caught.
		givenMessage = routeErr.message;
	}
	
	
	// Validate error message.
	checkMissingGraphError(givenMessage);
}



// Attempts 'shortest route' pathfinding on a missing graph in a 'try-catch' structure.
function callShortestRouteMissingGraph()
{
	var givenMessage = "";
	
	try
	{
		// Perform pathfinding.
		shortestRoute.findRoute(null, "A", "B");
		givenMessage = "";
	}
	catch(routeErr)
	{
		// Error caught.
		givenMessage = routeErr.message;
	}
	
	// Validate error message.
	checkMissingGraphError(givenMessage);
}



// Attempts 'possible routes' pathfinding on a missing graph in a 'try-catch' structure.
function callPossibleRoutesMissingGraph()
{
	var givenMessage = "";
	
	try
	{
		// Perform pathfinding.
		possibleRoutes.findRoutes(null, "A", "B", null, null);
		givenMessage = "";
	}
	catch(routeErr)
	{
		// Error caught.
		givenMessage = routeErr.message;
	}
	
	// Validate error message.
	checkMissingGraphError(givenMessage);
}



// Validate output distance number for valid pathfinding cases.
function checkOutputDistanceNumber(distNum)
{
	var correctType = Number.isInteger(distNum);
	
	if (correctType === true && distNum > 0)
	{
		// Valid.
		expect(true).to.be.true;
	}
	else
	{
		// Invalid.
		throw new Error("Output must be a positive, whole number.");
	}
}


// Validates result value for multiple possible routes.
function checkMultiplePossibleRoutes(countNum)
{
	var correctType = Number.isInteger(countNum);
	
	if (correctType === true && countNum >= 2)
	{
		// Valid.
		expect(true).to.be.true;
	}
	else
	{
		// Invalid.
		throw new Error("Output must be a whole number that is at least 2.");
	}
}


// Validates caught error for missing graph 'try-catch'
function checkMissingGraphError(vMsg)
{	
	if (vMsg === graphErrMsg)
	{
		// Valid.
		expect(true).to.be.true;
	}
	else if (vMsg.length > 0)
	{
		// Wrong error.
		flagIncorrectError();
	}
	else
	{
		// No error.
		throw new Error("No error was thrown.");
	}
}


// Incorrect error thrown in 'try-catch'
function flagIncorrectError()
{
	var preparedText = ["Incorrect pathfinding error thrown.\r\n", "Should had been: '", graphErrMsg, "'"].join("");
	throw new Error(preparedText);
}



module.exports = runTests;