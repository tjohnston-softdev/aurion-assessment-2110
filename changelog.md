# Changelog

**./src/input-file.js**
* Wrote new functions:
	* 'getInputFileEntry' - Checks if the input file exists and reads entry on file system.
	* 'validateInputFileEntry' - Validates file system entry after it has been retrieved.
	* 'extractFileSystemError' - Extracts message from file system error.
	* 'displayFileSystemError' - Writes and displays error text for file-system actions.
	* 'displayInputFileError' - Writes and displays error text for input file validation.

---

**./submission.js**
* New variables: 'inputFileEntry' and 'inputFileValid'
* 'inputFileEntry' is assigned with call to 'inputFile.getEntry'
* 'inputFileValid' is assigned with call to 'inputFile.validateEntry'
* Entry will only be validated if it is successfully retrieved.