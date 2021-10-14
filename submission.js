const inputFile = require("./src/input-file");
const parseGraph = require("./src/parse-graph");
const exactRoute = require("./src/exact-route");
const shortestRoute = require("./src/shortest-route");
const possibleRoutes = require("./src/possible-routes");
const routeCriteria = require("./src/common/route-criteria");
const numSigns = require("./src/common/num-signs");

const routeStopCriteria = routeCriteria.defineCriteria();
const routeDistCriteria = routeCriteria.defineCriteria();

runSubmission();

function runSubmission()
{
	var enteredPath = inputFile.readPathArg(process.argv);
	var inpEntry = inputFile.getEntry(enteredPath);
	var inpValid = false;
	var inpContents = "";
	var parsedGraphObject = null;
	var caseResultArray = [];
	
	if (inpEntry.retrieved === true)
	{
		inpValid = inputFile.validateEntry(inpEntry);
	}
	
	if (inpValid === true)
	{
		inpContents = inputFile.readContents(enteredPath);
	}
	
	if (inpContents !== null)
	{
		parsedGraphObject = parseGraph.performParsing(inpContents);
	}
	
	if (parsedGraphObject.valid === true)
	{
		callExactRouteTestCases(parsedGraphObject, caseResultArray);
		callPossibleRouteByStopCountTestCases(parsedGraphObject, caseResultArray);
		callShortestRouteTestCases(parsedGraphObject, caseResultArray);
		callPossibleRouteByDistanceTestCase(parsedGraphObject, caseResultArray)
		
		console.log(caseResultArray);
	}
}



function callExactRouteTestCases(pGraphObj, resArr)
{
	var case1 = exactRoute.getDistance(pGraphObj, "ABC");
	var case2 = exactRoute.getDistance(pGraphObj, "AD");
	var case3 = exactRoute.getDistance(pGraphObj, "ADC");
	var case4 = exactRoute.getDistance(pGraphObj, "AEBCD");
	var case5 = exactRoute.getDistance(pGraphObj, "AED");
	
	resArr.push(case1, case2, case3, case4, case5);
}


function callPossibleRouteByStopCountTestCases(pGraphObj, resArr)
{
	var case6 = null;
	var case7 = null;
	
	routeStopCriteria.sign = numSigns.LESS_EQUAL;
	routeStopCriteria.number = 3;
	case6 = possibleRoutes.findRoutes(pGraphObj, "C", "C", routeStopCriteria, null);
	
	routeStopCriteria.sign = numSigns.EQUAL;
	routeStopCriteria.number = 4;
	case7 = possibleRoutes.findRoutes(pGraphObj, "A", "C", routeStopCriteria, null);
	
	resArr.push(case6, case7);
}


function callShortestRouteTestCases(pGraphObj, resArr)
{
	var case8 = shortestRoute.findRoute(pGraphObj, "A", "C");
	var case9 = shortestRoute.findRoute(pGraphObj, "B", "B");
	resArr.push(case8, case9);
}


function callPossibleRouteByDistanceTestCase(pGraphObj, resArr)
{
	var case10 = null;
	
	routeDistCriteria.sign = numSigns.LESS;
	routeDistCriteria.number = 30;
	case10 = possibleRoutes.findRoutes(pGraphObj, "C", "C", null, routeDistCriteria);
	
	resArr.push(case10);
}