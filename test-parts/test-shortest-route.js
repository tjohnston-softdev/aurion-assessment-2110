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
function handleShortestRoute()
{
	var unknownNodesMsg = graphTasks.getUnknownNodesText();
	var noRouteMsg = graphTasks.getNoRouteText();
	
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



module.exports = handleShortestRoute;