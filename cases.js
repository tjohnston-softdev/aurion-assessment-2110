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


function runTestCase1(givenInputGraph)
{
	var actualValue = exactRoute.getDistance(givenInputGraph, "ABC");
	return setOutputObject(9, actualValue);
}


function runTestCase2(givenInputGraph)
{
	var actualValue = exactRoute.getDistance(givenInputGraph, "AD");
	return setOutputObject(5, actualValue);
}


function runTestCase3(givenInputGraph)
{
	var actualValue = exactRoute.getDistance(givenInputGraph, "ADC");
	return setOutputObject(13, actualValue);
}


function runTestCase4(givenInputGraph)
{
	var actualValue = exactRoute.getDistance(givenInputGraph, "AEBCD");
	return setOutputObject(22, actualValue);
}


function runTestCase5(givenInputGraph)
{
	var actualValue = exactRoute.getDistance(givenInputGraph, "AED");
	return setOutputObject("NO SUCH ROUTE", actualValue);
}


function runTestCase6(givenInputGraph)
{
	var routeStart = routeCriteria.defineStartNode("C");
	var routeEnd = routeCriteria.defineEndNode("C");
	var routeStopCount = routeCriteria.defineStopCount(3, numSigns.LESS_EQUAL);
	var searchCriteria = [routeStart, routeEnd, routeStopCount];
	
	var actualValue = possibleRoutes.findRoutes(givenInputGraph, searchCriteria);
	return setOutputObject(2, actualValue.length);
}


function runTestCase7(givenInputGraph)
{
	var routeStart = routeCriteria.defineStartNode("A");
	var routeEnd = routeCriteria.defineEndNode("C");
	var routeStopCount = routeCriteria.defineStopCount(4, numSigns.EQUAL);
	
	var searchCriteria = [routeStart, routeEnd, routeStopCount];
	
	var actualValue = possibleRoutes.findRoutes(givenInputGraph, searchCriteria);
	return setOutputObject(3, actualValue.length);
}


function runTestCase8(givenInputGraph)
{
	var actualValue = shortestRoute.findRoute(givenInputGraph, "A", "C");
	return setOutputObject(9, actualValue);
}


function runTestCase9(givenInputGraph)
{
	var actualValue = shortestRoute.findRoute(givenInputGraph, "B", "B");
	return setOutputObject(9, actualValue);
}


function runTestCase10(givenInputGraph)
{
	var routeStart = routeCriteria.defineStartNode("C");
	var routeEnd = routeCriteria.defineEndNode("C");
	var routeDist = routeCriteria.defineTotalDistance(30, numSigns.LESS);
	
	var searchCriteria = [routeStart, routeEnd, routeDist];
	
	var actualValue = possibleRoutes.findRoutes(givenInputGraph, searchCriteria);
	return setOutputObject(7, actualValue.length);
}



function setOutputObject(vExp, vAct)
{
	return {"expected": vExp, "actual": vAct};
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