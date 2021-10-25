# Changelog

**./test-parts/test-graph-parse.js**
* Declared global variable 'alphabet' - String from A to Z.
* Declared global variable 'maxEdges'
	* When testing the hard edge limit, a graph will be generated containing `maxEdges \* 1.15` edges, rounding up.
	* Used as-is when checking final edge count.
* Wrote unit tests for ignored data with the function 'handleIgnoreData'
	* Whitespace
	* Case Sensitivity
	* All Possible Nodes
	* Hard Edge Limit
	* Duplicate Edges
	* Recursive Edge
	* Zero Distance
* New secondary functions:
	* defineWhitespaceEdges
	* defineCaseSensitivityEdges
	* defineDupeEdges
	* defineRecurseEdges
	* defineZeroDistEdges
	* defineAlphabetGraph
	* defineMaxEdgesGraph
* Changes to 'checkParseResult'
	* Split the `deep.equal` checks into their own function 'checkGraphContents'
	* Removed parameters 'nodeArr' and 'edgeArr'