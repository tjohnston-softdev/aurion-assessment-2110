// Output test results to console.

const caseCol = 2;
const expectCol = 17;
const actualCol = 42;


function outputResultsToConsole(resultArray)
{
	var caseIndex = 0;
	var currentNumber = -1;
	var currentCase = {};
	
	console.log("");
	renderHeadRow();
	
	for (caseIndex = 0; caseIndex < resultArray.length; caseIndex = caseIndex + 1)
	{
		currentNumber = caseIndex + 1;
		currentCase = resultArray[caseIndex];
		renderBodyRow(currentNumber, currentCase);
	}
}


function renderHeadRow()
{
	var rowText = "";
	
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


function renderBodyRow(caseNum, caseObj)
{
	var currentSubstring = "";
	var rowText = "";
	
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