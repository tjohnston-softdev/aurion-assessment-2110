const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const possibleRoutes = require("../../../src/possible-routes");
const routeCriteria = require("../../../src/common/route-criteria");
const pathfindingHelp = require("../../../src/test-common/pathfinding-help");
const exampleGraphObject = require("../../../src/test-common/graph-input");


function callTemplateCriteriaTests()
{
	describe("Template", function()
	{
		it("String Too Long", function()
		{
			var longStr = writeLongString();
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



function writeLongString()
{
	var writeRes = "";
	
	while (writeRes.length < 1005)
	{
		writeRes += "ABCDEF";
	}
	
	return writeRes;
}


module.exports =
{
	callTests: callTemplateCriteriaTests
};