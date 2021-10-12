const inputFile = require("./src/input-file");
const parseGraph = require("./src/parse-graph");

runSubmission();

function runSubmission()
{
	var enteredPath = inputFile.readPathArg(process.argv);
	var inpEntry = inputFile.getEntry(enteredPath);
	var inpValid = false;
	var inpContents = "";
	var parsedGraphObject = null;
	
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
		console.log(parsedGraphObject);
	}
}