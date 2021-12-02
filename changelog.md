# Changelog

**./test-parts/input/**
* New folder - Test groups split from '../test-input-functions.js'
* Each test group has its own file.
	* 'path-arg.js' - Path argument
	* 'entry-retrieval.js' - Get Input File Entry
	* 'entry-validation.js - Validate Input File Entry
	* 'file-reading.js' - Read Contents

---

**./test-parts/test-input-functions.js**
* Wrote new function 'defineInputData'
* Merged global variables into a single object 'inputDataObject'
	* validFilePath
	* invalidFilePath
	* unknownErrorText
* 'inputDataObject' is assigned using 'defineInputData'
* Moved functions to './input/path-arg.js'
	* 'handleArgumentFunction' as 'callArgumentTests'
	* defineArgsObject
* Moved functions to './input/entry-retrieval.js'
	* 'handleGetFileEntry' as 'callEntryRetrievalTests'
	* callUnknownFile
	* checkEntry
* Moved functions to './input/entry-validation.js'
	* 'handleValidateFileEntry' as 'callEntryValidationTests'
	* defineRetrievedEntry
	* callInvalidEntry
* Moved functions to './input/file-reading.js'
	* 'handleReadFile' as 'callFileReadTests'
	* callInvalidRead
* Removed requirements:
	* inputFile
	* fileSize
	* errorThrowing
* Added requirements:
	* ./input/path-arg
	* ./input/entry-retrieval
	* ./input/entry-validation
	* ./input/file-reading