const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const possibleRoutes = require("../src/possible-routes");
const numSigns = require("../src/common/enum/num-signs");
const routeCriteria = require("../src/common/route-criteria");
const errorThrowing = require("../src/test-common/error-throwing");
const nullGraph = require("../src/test-common/null-graph");
const pathfindingHelp = require("../src/test-common/pathfinding-help");
const exampleGraphObject = require("../src/test-common/graph-input");

// Main function.
function runTests()
{
	describe("Possible Routes - Invalid", function()
	{
		handleArguments();
		handleNodes();
		handleStopDist();
		handleTemplate();
	});
}


function handleArguments()
{
	describe("Arguments", function()
	{
		it("Missing Graph", function()
		{
			callPossibleRoutesMissingGraph();
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
		
		it("Empty Criteria", function()
		{
			var searchCriteria = [];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			expect(resultValue).to.equal(Number.POSITIVE_INFINITY);
		});
		
		it("Impossible Route", function()
		{
			var routeStart = routeCriteria.defineStartNode("A");
			var routeEnd = routeCriteria.defineEndNode("G");
			
			var searchCriteria = [routeStart, routeEnd];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			expect(resultValue).to.equal(0);
		});
		
	});
}


function handleNodes()
{
	describe("Nodes", function()
	{
		it("Value Type", function()
		{
			var invalidObject = routeCriteria.defineStartNode(-1);
			var searchCriteria = [invalidObject];
			
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "START NODE MUST BE A VALID, NON-EMPTY STRING.");
		});
		
		it("Empty", function()
		{
			var invalidObject = routeCriteria.defineEndNode("");
			var searchCriteria = [invalidObject];
			
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "END NODE MUST BE A VALID, NON-EMPTY STRING.");
		});
		
		it("Unknown", function()
		{
			var invalidObject = routeCriteria.defineStartNode("X");
			var searchCriteria = [invalidObject];
			
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "START NODE NODE DOES NOT EXIST.");
		});
	});
}


function handleStopDist()
{
	describe("Stop Count and Total Distance", function()
	{
		it("Zero", function()
		{
			var routeDist = routeCriteria.defineTotalDistance(0, numSigns.EQUAL);
			var searchCriteria = [routeDist];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "TOTAL DISTANCE NUMBER MUST BE POSITIVE.");
		});
		
		it("Negative", function()
		{
			var routeStopCount = routeCriteria.defineStopCount(-10, numSigns.EQUAL);
			var searchCriteria = [routeStopCount];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "STOP COUNT NUMBER MUST BE POSITIVE.");
		});
		
		it("Unknown Sign", function()
		{
			var routeDist = routeCriteria.defineTotalDistance(100, "NOT SIGN");
			var searchCriteria = [routeDist];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "TOTAL DISTANCE NUMBER SIGN IS INVALID.");
		});
		
		it("Number Type", function()
		{
			var routeDist = routeCriteria.defineTotalDistance(123.45, numSigns.GREAT_EQUAL);
			var searchCriteria = [routeDist];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "TOTAL DISTANCE NUMBER MUST BE WHOLE.");
		});
	});
}


function handleTemplate()
{
	describe("Template", function()
	{
		it("String Too Long", function()
		{
			var longStr = writeLongTemplateString();
			var routeTemplate = routeCriteria.defineTemplate(longStr, false);
			var searchCriteria = [routeTemplate];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "TEMPLATE STRING IS TOO LONG.");
		});
		
		it("String Type", function()
		{
			var routeTemplate = routeCriteria.defineTemplate(null, false);
			var searchCriteria = [routeTemplate];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "TEMPLATE MUST BE A VALID, NON-EMPTY STRING.");
		});
	
		it("Empty String", function()
		{
			var routeTemplate = routeCriteria.defineTemplate("             ", true);
			var searchCriteria = [routeTemplate];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "TEMPLATE STRING CANNOT BE EMPTY.");
		});
		
		it("Regular Expression Parse", function()
		{
			var routeTemplate = routeCriteria.defineTemplate("AB((CD[EF", false);
			var searchCriteria = [routeTemplate];
			var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
			pathfindingHelp.checkInvalidCriteriaMessage(resultValue, "TEMPLATE STRING IS NOT A VALID REGULAR EXPRESSION.");
		});
	});
}



function writeLongTemplateString()
{
	var writeRes = "";
	
	while (writeRes.length < 1100)
	{
		writeRes += "ABCDEF";
	}
	
	return writeRes;
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