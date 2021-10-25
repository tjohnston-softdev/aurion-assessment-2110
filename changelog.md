# Changelog

**./test-parts/test-graph-parse.js**
* Wrote new secondary functions:
	* 'callInvalidEntry' - Performs `try-catch` on parse function.
	* 'flagIncorrectError' - Custom error message for wrong exception thrown.
* Declared new global variables:
	* formatErrorText
	* arrayErrorText
* Wrote new function 'handleInvalidCases' - Unit tests for when graph parsing throws an error.
	* Invalid Type
	* Empty String
	* Wrong String Format
	* [...]
	* Unsupported Distance Character