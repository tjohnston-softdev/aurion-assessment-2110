# Changelog

**./test-parts/test-input-functions.js**
* Merged all `try-catch` validation code into new functions:
	* 'checkTryCatch' - Coordinates result checking.
	* 'flagIncorrectError' - Writes and throws error for when message is incorrect.
* 'checkTryCatch' is called from functions:
	* callUnknownFile
	* callInvalidEntry
	* callInvalidRead
* Custom error text has been implemented for invalid unit tests.
	* No error thrown.
	* Wrong error thrown.