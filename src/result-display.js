// Output test results to console.
function outputResultsToConsole(resultArray)
{
	var caseIndex = 0;
	var currentNumber = -1;
	var currentCase = {};
	var currentValue = null;
	var currentLine = "";
	
	console.log("");
	
	for (caseIndex = 0; caseIndex < resultArray.length; caseIndex = caseIndex + 1)
	{
		currentNumber = caseIndex + 1;
		currentCase = resultArray[caseIndex];
		currentValue = currentCase.actual;
		currentLine = ["Output #", currentNumber, ":", "\t", currentValue].join("");
		
		console.log(currentLine);
	}
}


module.exports =
{
	outputToConsole: outputResultsToConsole
};