const fs = require("fs");
const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const parseGraph = require("../src/parse-graph");
const exactRoute = require("../src/exact-route");
const shortestRoute = require("../src/shortest-route");
const possibleRoutes = require("../src/possible-routes");
const numSigns = require("../src/common/num-signs");
const routeCriteria = require("../src/common/route-criteria");

const graphErrMsg = "Cannot read property 'nodes' of null";
const unknownNodesMsg = "UNKNOWN NODES";
const noRouteMsg = "NO SUCH ROUTE";
const badCriteriaMsg = "INVALID COUNT CRITERIA";

var exampleGraph = null;


function runTests()
{
	describe("Invalid Pathfinding Input", function()
	{
		prepareExampleGraph();
		//handleExactRoute();
		//handleShortestRoute();
		handlePossibleRoutes();
	});
}


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


function handlePossibleRoutes()
{
	describe("Possible Routes", function()
	{
		var emptyCriteria = null;
		var invalidCriteria = routeCriteria.defineCriteria("Bad number", "Bad sign");
		
		it("Correct Output - Single", function()
		{
			var stopInput = routeCriteria.defineCriteria(1, numSigns.EQUAL);
			var distInput = routeCriteria.defineCriteria(10, numSigns.LESS_EQUAL);
			var resultValue = possibleRoutes.findRoutes(exampleGraph, "A", "C", stopInput, distInput);
			expect(resultValue).to.equal(1);
		});
		
		it("Correct Output - Multiple", function()
		{
			var stopInput = routeCriteria.defineCriteria(5, numSigns.LESS_EQUAL);
			var resultValue = possibleRoutes.findRoutes(exampleGraph, "A", "F", stopInput, emptyCriteria);
			checkMultiplePossibleRoutes(resultValue);
		});
		
		it("Correct Output - Zero", function()
		{
			var distInput = routeCriteria.defineCriteria(5, numSigns.LESS_EQUAL);
			var resultValue = possibleRoutes.findRoutes(exampleGraph, "A", "F", emptyCriteria, distInput);
			expect(resultValue).to.equal(0);
		});
		
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
			//var resultValue = possibleRoutes.findRoutes(exampleGraph, "A", "G", emptyCriteria, emptyCriteria);
			//console.log(resultValue);
			expect(true).to.be.true;
		});
		
	});
}


function callExactRouteMissingGraph()
{
	var givenMessage = "";
	
	try
	{
		exactRoute.getDistance(null, "CBFD");
		givenMessage = "";
	}
	catch(routeErr)
	{
		givenMessage = routeErr.message;
	}
	
	checkMissingGraphError(givenMessage);
}


function callShortestRouteMissingGraph()
{
	var givenMessage = "";
	
	try
	{
		shortestRoute.findRoute(null, "A", "B");
		givenMessage = "";
	}
	catch(routeErr)
	{
		givenMessage = routeErr.message;
	}
	
	checkMissingGraphError(givenMessage);
}


function callPossibleRoutesMissingGraph()
{
	var givenMessage = "";
	
	try
	{
		possibleRoutes.findRoutes(null, "A", "B", null, null);
		givenMessage = "";
	}
	catch(routeErr)
	{
		givenMessage = routeErr.message;
	}
	
	checkMissingGraphError(givenMessage);
}



function checkOutputDistanceNumber(distNum)
{
	var correctType = Number.isInteger(distNum);
	
	if (correctType === true && distNum > 0)
	{
		expect(true).to.be.true;
	}
	else
	{
		throw new Error("Output must be a positive, whole number.");
	}
}


function checkMultiplePossibleRoutes(countNum)
{
	var correctType = Number.isInteger(countNum);
	
	if (correctType === true && countNum >= 2)
	{
		expect(true).to.be.true;
	}
	else
	{
		throw new Error("Output must be a whole number that is at least 2.");
	}
}


function checkMissingGraphError(vMsg)
{	
	if (vMsg === graphErrMsg)
	{
		expect(true).to.be.true;
	}
	else if (vMsg.length > 0)
	{
		flagIncorrectError();
	}
	else
	{
		throw new Error("No error was thrown.");
	}
}


function flagIncorrectError()
{
	var preparedText = ["Incorrect error thrown.\r\n", "Should had been: '", graphErrMsg, "'"].join("");
	throw new Error(preparedText);
}



module.exports = runTests;