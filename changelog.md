# Changelog

**./src/test-common/parse-output.js**
* Renamed function from 'getParseOutputObject' to 'getObject'
* File exports result of 'getObject' and not the function itself.

---

**./test-parts/test-graph-parse.js**
* Removed 'parseOutputData' global variable.
* Renamed 'parseOutput' requirement to 'parseOutputData'
* Removed "External output edge data." comment.
* Removed tests:
	* "Load Output Data" (loadOutputData)
	* "Dispose Output Data" (disposeOutputData)
* Simplified 'parseObj' exist check. (checkParseResult)