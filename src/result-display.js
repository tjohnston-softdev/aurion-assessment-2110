function outputResultsToConsole(resultArray)
{
	var caseIndex = 0;
	var currentNumber = -1;
	var currentValue = null;
	var currentLine = "";
	
	console.log("");
	
	for (caseIndex = 0; caseIndex < resultArray.length; caseIndex = caseIndex + 1)
	{
		currentNumber = caseIndex + 1;
		currentValue = resultArray[caseIndex];
		currentLine = ["Output #", currentNumber, ":", "\t", currentValue].join("");
		
		console.log(currentLine);
	}
}


module.exports =
{
	outputToConsole: outputResultsToConsole
};