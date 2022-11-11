// Output test results to console.


// Table column start points.
const caseCol = 2;
const expectCol = 17;
const actualCol = 42;


// Main function.
function outputResultsToConsole(resultArray)
{
	// Display table header.
	console.log("");
	renderHeadRow();
	
	// Loop test cases.
	for (var caseIndex = 0; caseIndex < resultArray.length; caseIndex++)
	{
		// Display row for current case.
		var currentNumber = caseIndex + 1;
		var currentCase = resultArray[caseIndex];
		renderBodyRow(currentNumber, currentCase);
	}
}


// Displays table header row.
function renderHeadRow()
{
	var rowText = "";
	
	// Loop line characters until all columns rendered.
	while (rowText.length <= actualCol)
	{
		if (rowText.length === caseCol)
		{
			rowText += "Case";
		}
		else if (rowText.length === expectCol)
		{
			rowText += "Expected";
		}
		else if (rowText.length === actualCol)
		{
			rowText += "Actual";
		}
		else
		{
			rowText += " ";
		}
	}
	
	console.log(rowText);
}


// Displays body row for given test case.
function renderBodyRow(caseNum, caseObj)
{
	var rowText = "";
	
	// Loop line characters until all columns rendered.
	while (rowText.length <= actualCol)
	{
		var currentSubstring = " ";
		
		if (rowText.length === caseCol)
		{
			currentSubstring = "#" + caseNum;
		}
		else if (rowText.length === expectCol)
		{
			currentSubstring = String(caseObj.expected);
		}
		else if (rowText.length === actualCol)
		{
			currentSubstring = String(caseObj.actual);
		}
		
		rowText += currentSubstring;
	}
	
	console.log(rowText);
}


module.exports =
{
	outputToConsole: outputResultsToConsole
};