// Output test results to console.


// Table column start points.
const caseCol = 2;
const expectCol = 17;
const actualCol = 42;


// Main function.
function outputResultsToConsole(resultArray)
{
	var caseIndex = 0;
	var currentNumber = -1;
	var currentCase = {};
	
	// Display table header.
	console.log("");
	renderHeadRow();
	
	// Loop test cases.
	for (caseIndex = 0; caseIndex < resultArray.length; caseIndex = caseIndex + 1)
	{
		// Display row for current case.
		currentNumber = caseIndex + 1;
		currentCase = resultArray[caseIndex];
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
			// Blank space.
			rowText += " ";
		}
	}
	
	console.log(rowText);
}


// Displays body row for given test case.
function renderBodyRow(caseNum, caseObj)
{
	var currentSubstring = "";
	var rowText = "";
	
	// Loop line characters until all columns rendered.
	while (rowText.length <= actualCol)
	{
		currentSubstring = " ";
		
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