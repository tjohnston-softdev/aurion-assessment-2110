const fs = require("fs");
const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const parseGraph = require("../src/parse-graph");
const exactRoute = require("../src/exact-route");
const shortestRoute = require("../src/shortest-route");
const possibleRoutes = require("../src/possible-routes");

const graphErrMsg = "Cannot read property 'nodes' of null";
const unknownNodesMsg = "UNKNOWN NODES";
const noRouteMsg = "NO SUCH ROUTE";

var exampleGraph = null;


function runTests()
{
	describe("Invalid Pathfinding Input", function()
	{
		prepareExampleGraph();
		handleExactRoute();
	});
}


function prepareExampleGraph()
{
	describe("Prepare Example Graph", function()
	{
		var inpString = null;
		
		it("String Written", function(done)
		{
			inpString = "AE14, CB13, EB7, EA11, BF10, BE20, BD3, BA1, AC2, FD7";
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



function checkOutputDistanceNumber(distNum)
{
	var correctType = Number.isInteger(distNum);
	
	if (correctType === true && distNum > 0)
	{
		expect(true).to.be.true;
	}
	else
	{
		throw Error("Output must be a positive, whole number.");
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