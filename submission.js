const inputFile = require("./src/input-file");

runSubmission();

function runSubmission()
{
	var enteredPath = inputFile.readPathArg(process.argv);
	console.log(enteredPath);
}