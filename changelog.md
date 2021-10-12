# Changelog

**./src/common/error-messages.js**
* New file - Functions for writing and displaying error messages.
* Split from: './src/input-file.js'

---

**./src/input-file.js**
* Added requirement for: './common/error-messages'
* Moved functions to 'errorMessages'
	* extractFileSystemError
	* 'displayInputFileError' as 'displayInputFileErrorText'
	* 'displayFileSystemError' split into:
		* displayFileSystemErrorText
		* prepareFileSystemError
* Replaced calls:
	* 'displayFileSystemError' with 'errorMessages.displayFileSystem'
	* 'displayInputFileError' with 'errorMessages.displayInputFile'
* Removed 'flagMsg' variable from functions:
	* getInputFileEntry
	* readInputFileContents
* Replaced references to 'flagMsg' with 'fsErr'