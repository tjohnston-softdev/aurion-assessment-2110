# Changelog

**./src/parse-graph.js**
* Wrote new function 'getNodeID'
	* Retrieves index number of a node if it already exists.
	* If not, add it to the array and return assigned ID.
* Changes to 'loopGraphParts'
	* Removed 'edgeArr' parameter.
	* Declared 'graphObject' parameter.
	* Replaced 'edgeArr' reference with 'graphObject.edges'
	* Declared 'currentLengthGiven' variable.
	* Replaced references to 'currentValid' with 'currentLengthGiven'
	* 'currentValid' is assigned as False.
	* 'currentEdge.origin' is assigned with 'getNodeID'
	* 'currentEdge.destination' is assigned with 'getNodeID'
* Changes to 'performInputParsing'
	* Added 'nodes' result property.
	* Replaced 'parseRes.edges' with 'parseRes'

---

**./submission.js**
* Parsed graph is only displayed to console if the result is successful.