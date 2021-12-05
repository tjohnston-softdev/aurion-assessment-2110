// Invalid argument tests for 'possible routes'

const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const possibleRoutes = require("../../../src/possible-routes");
const numSigns = require("../../../src/common/enum/num-signs");
const routeCriteria = require("../../../src/common/route-criteria");
const errorThrowing = require("../../../src/test-common/error-throwing");
const nullGraph = require("../../../src/test-common/null-graph");
const pathfindingHelp = require("../../../src/test-common/pathfinding-help");
const exampleGraphObject = require("../../../src/test-common/graph-input");


// Main function
function callArgumentTests()
{
	describe("Arguments", function()
	{
		it("Missing Graph", function()
		{
			callMissingGraph();
		});
		
		it("Criteria Array", function()
		{
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, 12345);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "INPUT MUST BE A VALID ARRAY.");
		});
		
		it("Individual Criteria Object", function()
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


module.exports =
{
	callTests: callArgumentTests
};