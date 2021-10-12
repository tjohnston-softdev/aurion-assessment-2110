# Changelog

**./src/input-file.js**
* getInputFileEntry
	* Renamed catch variable from 'e' to 'fsErr'
* Wrote new function 'readInputFileContents' - Reads contents from input file.

---

**./submission.js**
* Renamed variables:
	* 'inputFileEntry' to 'inpEntry'
	* 'inputFileValid' to 'inpValid'
* Declared new variable 'inpContents'
* 'inpContents' is assigned with 'inputFile.readContents'
* On successful result, display input file contents.