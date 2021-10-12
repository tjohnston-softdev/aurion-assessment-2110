const inputFile = require("./src/input-file");

runSubmission();

function runSubmission()
{
	var enteredPath = inputFile.readPathArg(process.argv);
	var inpEntry = inputFile.getEntry(enteredPath);
	var inpValid = false;
	var inpContents = "";
	
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
		console.log(inpContents);
	}
}