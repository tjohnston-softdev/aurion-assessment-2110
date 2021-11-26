const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const shortestRoute = require("../src/shortest-route");
const graphTasks = require("../src/common/graph-tasks");
const errorThrowing = require("../src/test-common/error-throwing");
const nullGraph = require("../src/test-common/null-graph");
const pathfindingHelp = require("../src/test-common/pathfinding-help");
const exampleGraphObject = require("../src/test-common/graph-input");


// Main Function
function runTests()
{
	describe("Shortest Route", function()
	{
		handleCorrectOutput();
		handleIncorrectOutput();
	});
}


function handleCorrectOutput()
{
	describe("Correct Output", function()
	{
		it("Open", function()
		{
			var resultValue = shortestRoute.findRoute(exampleGraphObject, "A", "F");
			pathfindingHelp.checkOutputDistance(resultValue);
		});
		
		it("Closed", function()
		{
			var resultValue = shortestRoute.findRoute(exampleGraphObject, "C", "C");
			pathfindingHelp.checkOutputDistance(resultValue);
		});
	});
}


function handleIncorrectOutput()
{
	var noRouteMsg = graphTasks.getNoRouteText();
	var invalidStartMsg = "MISSING START NODE";
	var invalidEndMsg = "MISSING END NODE";
	
	describe("Incorrect Output", function()
	{
		it("Missing Graph", function()
		{
			callShortestRouteMissingGraph();
		});
		
		it("Missing Node Argument", function()
		{
			var resultValue = shortestRoute.findRoute(exampleGraphObject, "A", null);
			expect(resultValue).to.equal(invalidEndMsg);
		});
		
		it("Empty Node Argument", function()
		{
			var resultValue = shortestRoute.findRoute(exampleGraphObject, "A", "");
			expect(resultValue).to.equal(invalidEndMsg);
		});
		
		it("Unknown Start Node", function()
		{
			var resultValue = shortestRoute.findRoute(exampleGraphObject, "Z", "A");
			expect(resultValue).to.equal(invalidStartMsg);
		});
		
		it("Unknown End Node", function()
		{
			var resultValue = shortestRoute.findRoute(exampleGraphObject, "A", "Z");
			expect(resultValue).to.equal(invalidEndMsg);
		});
		
		it("Impossible Route", function()
		{
			var resultValue = shortestRoute.findRoute(exampleGraphObject, "A", "G");
			expect(resultValue).to.equal(noRouteMsg);
		});
		
	});
}


// Attempts pathfinding on a missing graph.
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
		correctError = (routeErr.message === nullGraph.msgTxt);
	}
	
	// Validate error message.
	errorThrowing.checkTryCatch(graphFound, correctError, nullGraph.msgTxt);
}

module.exports = runTests;