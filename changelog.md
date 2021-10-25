# Changelog

**./test-parts/parse-output.json**
* New file - Contains output edge array objects for when parsing graphs in unit tests.

---

**./test-parts/test-graph-parse.js**
* Required 'fs'
* Declared new global 'parseOutputData'
* The following functions have been removed with their contents now in 'parse-output.json'
	* defineValidCaseEdges
	* defineWhitespaceEdges
	* defineCaseSensitivityEdges
	* defineDupeEdges
	* defineRecurseEdges
	* defineZeroDistEdges
* Wrote new function 'loadOutputData'
	* Used to read 'parse-output.json'
	* Individual test cases for reading and parsing.
* Removed 'inclEdges' variable from the following test cases and replaced with the corresponding 'parseOutputData' property.
	* "Valid Case" - "Complete Graph"
	* "Ignore Data" - "Whitespace"
	* "Ignore Data" - "Case Sensitivity"
	* "Ignore Data" - "Duplicate Edges"
	* "Ignore Data" - "Recursive Edge"
	* "Ignore Data" - "Zero Distance"
* Renamed 'stringRes' to 'defineRes' in functions:
	* defineAlphabetGraph
	* defineMaxEdgesGraph