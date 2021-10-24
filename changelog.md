# Changelog

**./test-parts/test-input-functions.js**
* New unit testing functions:
	* handleValidateFileEntry
	* handleReadFile
* New secondary functions:
	* defineRetrievedEntry
	* callInvalidEntry
	* callInvalidRead
* Renamed 'getArgumentsObject' function to 'defineArgsObject'
* Moved valid file path input to its own global 'validFilePath'
* Moved path input from 'callUnknownFile' to its own global 'invalidFilePath'
* Moved "no such file or directory" error text to its own global '