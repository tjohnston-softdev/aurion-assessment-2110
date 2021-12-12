# Changelog

**./src/result-display.js**
* Comment is now header for the entire file and not just 'outputResultsToConsole'
* Declared global variables indicating column start points:
	* caseCol
	* expectCol
	* actualCol
* Wrote new function 'renderHeadRow'
	* Used to write header row and output to console.
	* Columns for case number, expected value, and actual value.
* Wrote new function 'renderBodyRow'
	* Used to write body row and output to console.
	* Test case results.
* Changes to 'outputResultsToConsole'
	* 'renderHeadRow' is called before the loop.
	* Removed 'currentValue' and 'currentLine' variables.
	* Removed `console.log(currentLine)`
	* Added call to 'renderBodyRow' during the loop.