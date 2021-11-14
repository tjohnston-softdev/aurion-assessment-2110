# Changelog

**./src/test-common/parse-output.js**
* New file - Contains output edge arrays for 'parse' unit tests.
* Based on '../../test-parts/parse-output.json'

---

**./test-parts/parse-output.json**
* This file is now empty.
* Contents moved to '../src/test-common/parse-output.js'

---

**./test-parts/test-graph-parse.js**
* Required: '../src/test-common/parse-output'
* Changes to 'loadOutputData'
	* "external" --> "script" for header comment.
	* Removed "File Read" step.
	* Removed 'rawContents' variable.
	* Renamed "JSON Parsed" to "Loaded"
	* Removed "Parse as JSON." comment.
	* Modified "Loaded" to use 'parseOutput'