// Unit tests for 'exact route' pathfinding input values.

const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const exactRoute = require("../src/exact-route");
const graphTasks = require("../src/common/graph-tasks");
const errorThrowing = require("../src/test-common/error-throwing");
const nullGraph = require("../src/test-common/null-graph");
const pathfindingHelp = require("../src/test-common/pathfinding-help");
const exampleGraphObject = require("../src/test-common/graph-input");


// Main Function
function runTests()
{
	describe("Exact Route", function()
	{
		var tooShortMsg = "PATH MUST HAVE AT LEAST TWO NODES";
		var stringMsg = "PATH MUST BE A VALID STRING";
		var noRouteMsg = graphTasks.getNoRouteText();
		
		it("Correct Output", function()
		{
			var resultValue = exactRoute.getDistance(exampleGraphObject, "AEBA");
			pathfindingHelp.checkOutputDistance(resultValue);
		});
		
		it("Missing Graph", function()
		{
			callMissingGraph();
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



// Attempts pathfinding on a missing graph.
function callMissingGraph()
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
		correctError = (routeErr.message === nullGraph.msgTxt);
	}
	
	
	// Validate error message.
	errorThrowing.checkTryCatch(graphFound, correctError, nullGraph.msgTxt);
}



module.exports = runTests;