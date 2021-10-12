const inputFile = require("./src/input-file");

runSubmission();

function runSubmission()
{
	var enteredPath = inputFile.readPathArg(process.argv);
	var inputFileEntry = inputFile.getEntry(enteredPath);
	var inputFileValid = false;
	
	if (inputFileEntry.retrieved === true)
	{
		inputFileValid = inputFile.validateEntry(inputFileEntry);
	}
	
	if (inputFileValid === true)
	{
		console.log("Input File Valid");
	}
}