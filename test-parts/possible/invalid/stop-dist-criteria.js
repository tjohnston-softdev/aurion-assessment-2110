const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const possibleRoutes = require("../../../src/possible-routes");
const numSigns = require("../../../src/common/enum/num-signs");
const routeCriteria = require("../../../src/common/route-criteria");
const pathfindingHelp = require("../../../src/test-common/pathfinding-help");
const exampleGraphObject = require("../../../src/test-common/graph-input");


function callStopDistTests()
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



module.exports =
{
	callTests: callStopDistTests
};