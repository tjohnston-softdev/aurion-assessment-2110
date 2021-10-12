const inputFile = require("./src/input-file");
const parseGraph = require("./src/parse-graph");
const exactRoute = require("./src/exact-route");

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
		runExactRouteTestCases(parsedGraphObject, caseResultArray);
		console.log(caseResultArray);
	}
}



function runExactRouteTestCases(pGraphObj, resArr)
{
	var case1 = exactRoute.getDistance(pGraphObj, "ABC");
	var case2 = exactRoute.getDistance(pGraphObj, "AD");
	var case3 = exactRoute.getDistance(pGraphObj, "ADC");
	var case4 = exactRoute.getDistance(pGraphObj, "AEBCD");
	var case5 = exactRoute.getDistance(pGraphObj, "AED");
	
	resArr.push(case1, case2, case3, case4, case5);
}