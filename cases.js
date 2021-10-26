/*
	* This file contains example test cases for pathfinding algorithms.
	* Used by both the submission itself and the unit tests.
*/

const exactRoute = require("./src/exact-route");
const shortestRoute = require("./src/shortest-route");
const possibleRoutes = require("./src/possible-routes");
const resultDisplay = require("./src/result-display");
const routeCriteria = require("./src/common/route-criteria");
const numSigns = require("./src/common/num-signs");


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
	var routeStopCriteria = routeCriteria.defineCriteria();
	var actualValue = null;
	var caseResultObject = null;
	
	routeStopCriteria.sign = numSigns.LESS_EQUAL;
	routeStopCriteria.number = 3;
	
	actualValue = possibleRoutes.findRoutes(givenInputGraph, "C", "C", routeStopCriteria, null);
	caseResultObject = setOutputObject(2, actualValue);
	return caseResultObject;
}


// Test case 7
function runTestCase7(givenInputGraph)
{
	var routeStopCriteria = routeCriteria.defineCriteria();
	var actualValue = null;
	var caseResultObject = null;
	
	routeStopCriteria.sign = numSigns.EQUAL;
	routeStopCriteria.number = 4;
	
	actualValue = possibleRoutes.findRoutes(givenInputGraph, "A", "C", routeStopCriteria, null);
	caseResultObject = setOutputObject(3, actualValue);
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
	var routeDistanceCriteria = routeCriteria.defineCriteria();
	var actualValue = null;
	var caseResultObject = null;
	
	routeDistanceCriteria.sign = numSigns.LESS;
	routeDistanceCriteria.number = 30;
	
	actualValue = possibleRoutes.findRoutes(givenInputGraph, "C", "C", null, routeDistanceCriteria);
	caseResultObject = setOutputObject(7, actualValue);
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