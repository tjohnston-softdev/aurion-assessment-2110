/*
	* This file contains example test cases for pathfinding algorithms.
	* Used by both the submission itself and the unit tests.
*/

const exactRoute = require("./src/exact-route");
const shortestRoute = require("./src/shortest-route");
const possibleRoutes = require("./src/possible-routes");
const resultDisplay = require("./src/result-display");
const routeCriteria = require("./src/common/route-criteria");
const numSigns = require("./src/common/enum/num-signs");

const exampleGraphObject = require("./src/test-common/graph-input");
var routeOneWay = routeCriteria.defineOneWay();
var searchCriteria = [routeOneWay];
var resultValue = possibleRoutes.findRoutes(exampleGraphObject, searchCriteria);
console.log(resultValue);


// Test case 1
function runTestCase1(givenInputGraph)
{
	var actualValue = exactRoute.getDistance(givenInputGraph, "ABC");
	var caseResultObject = setOutputObject(9, actualValue);
	return caseResultObject;
}


// Test case 2
function runTestCase2(givenInputGraph)
{
	var actualValue = exactRoute.getDistance(givenInputGraph, "AD");
	var caseResultObject = setOutputObject(5, actualValue);
	return caseResultObject;
}


// Test case 3
function runTestCase3(givenInputGraph)
{
	var actualValue = exactRoute.getDistance(givenInputGraph, "ADC");
	var caseResultObject = setOutputObject(13, actualValue);
	return caseResultObject;
}


// Test case 4
function runTestCase4(givenInputGraph)
{
	var actualValue = exactRoute.getDistance(givenInputGraph, "AEBCD");
	var caseResultObject = setOutputObject(22, actualValue);
	return caseResultObject;
}


// Test case 5
function runTestCase5(givenInputGraph)
{
	var actualValue = exactRoute.getDistance(givenInputGraph, "AED");
	var caseResultObject = setOutputObject("NO SUCH ROUTE", actualValue);
	return caseResultObject;
}


// Test case 6
function runTestCase6(givenInputGraph)
{
	var routeStart = routeCriteria.defineStartNode("C");
	var routeEnd = routeCriteria.defineEndNode("C");
	var routeStopCount = routeCriteria.defineStopCount(3, numSigns.LESS_EQUAL);
	
	var searchCriteria = [routeStart, routeEnd, routeStopCount];
	var actualValue = null;
	var caseResultObject = null;
	
	actualValue = possibleRoutes.findRoutes(givenInputGraph, searchCriteria);
	caseResultObject = setOutputObject(2, actualValue.length);
	return caseResultObject;
}


// Test case 7
function runTestCase7(givenInputGraph)
{
	var routeStart = routeCriteria.defineStartNode("A");
	var routeEnd = routeCriteria.defineEndNode("C");
	var routeStopCount = routeCriteria.defineStopCount(4, numSigns.EQUAL);
	
	var searchCriteria = [routeStart, routeEnd, routeStopCount];
	var actualValue = null;
	var caseResultObject = null;
	
	actualValue = possibleRoutes.findRoutes(givenInputGraph, searchCriteria);
	caseResultObject = setOutputObject(3, actualValue.length);
	return caseResultObject;
}


// Test case 8
function runTestCase8(givenInputGraph)
{
	var actualValue = shortestRoute.findRoute(givenInputGraph, "A", "C");
	var caseResultObject = setOutputObject(9, actualValue);
	return caseResultObject;
}


// Test case 9
function runTestCase9(givenInputGraph)
{
	var actualValue = shortestRoute.findRoute(givenInputGraph, "B", "B");
	var caseResultObject = setOutputObject(9, actualValue);
	return caseResultObject;
}


// Test case 10
function runTestCase10(givenInputGraph)
{
	var routeStart = routeCriteria.defineStartNode("C");
	var routeEnd = routeCriteria.defineEndNode("C");
	var routeDist = routeCriteria.defineTotalDistance(30, numSigns.LESS);
	
	var searchCriteria = [routeStart, routeEnd, routeDist];
	var actualValue = null;
	var caseResultObject = null;
	
	actualValue = possibleRoutes.findRoutes(givenInputGraph, searchCriteria);
	caseResultObject = setOutputObject(7, actualValue.length);
	return caseResultObject;
}



// Output object for test case.
function setOutputObject(vExp, vAct)
{
	var outputRes = {"expected": vExp, "actual": vAct};
	return outputRes;
}



module.exports =
{
	runCase1: runTestCase1,
	runCase2: runTestCase2,
	runCase3: runTestCase3,
	runCase4: runTestCase4,
	runCase5: runTestCase5,
	runCase6: runTestCase6,
	runCase7: runTestCase7,
	runCase8: runTestCase8,
	runCase9: runTestCase9,
	runCase10: runTestCase10
};