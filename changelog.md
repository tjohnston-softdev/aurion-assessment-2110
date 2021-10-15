# Changelog

**./src/common/error-messages.js**
* Wrote new function 'outputToConsole'
	* Displays prepared error text to console.
	* Includes "ERROR" prefix.
* Replaced 'console.log' with 'outputToConsole' for functions:
	* displayFileSystemErrorText
	* displayInputFileErrorText
	* displayGraphSyntaxErrorText