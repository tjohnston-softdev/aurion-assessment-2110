/*
	Aurion technical assessment.
	Tyrone Johnston
	Originally submitted: 15 October 2021
	Unit tests update: 27 October 2021
	Co-pair update: 12 December 2021
*/


const inputFile = require("./src/input-file");
const parseGraph = require("./src/parse-graph");
const cases = require("./cases");
const resultDisplay = require("./src/result-display");

runSubmission();

// Main function.
function runSubmission()
{
	var enteredPath = inputFile.readPathArg(process.argv);			// Read file path argument.
	var inpEntry = inputFile.getEntry(enteredPath);					// Check if file exists.
	var inpValid = false;
	var inpContents = "";
	var parsedGraphObject = null;
	var caseResultArray = [];
	
	if (inpEntry.retrieved === true)
	{
		// Validate input file size.
		inpValid = inputFile.validateEntry(inpEntry);
	}
	
	if (inpValid === true)
	{
		// Read input file contents.
		inpContents = inputFile.readContents(enteredPath);
	}
	
	if (inpContents !== null)
	{
		// Parse input into graph.
		parsedGraphObject = parseGraph.performParsing(inpContents);
	}
	
	if (parsedGraphObject.valid === true)
	{
		// Perform tests and output to console.
		caseResultArray = callTestCases(parsedGraphObject);
		resultDisplay.outputToConsole(caseResultArray);
	}
}


// Run test cases.
function callTestCases(pGraphObj)
{
	var output1 = cases.runCase1(pGraphObj);
	var output2 = cases.runCase2(pGraphObj);
	var output3 = cases.runCase3(pGraphObj);
	var output4 = cases.runCase4(pGraphObj);
	var output5 = cases.runCase5(pGraphObj);
	var output6 = cases.runCase6(pGraphObj);
	var output7 = cases.runCase7(pGraphObj);
	var output8 = cases.runCase8(pGraphObj);
	var output9 = cases.runCase9(pGraphObj);
	var output10 = cases.runCase10(pGraphObj);
	
	var resArr = [];
	
	resArr.push(output1, output2, output3, output4, output5);
	resArr.push(output6, output7, output8, output9, output10);
	
	return resArr;
}