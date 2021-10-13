# Changelog

**./src/common/graph-tasks.js**
* New functions:
	* defineGraphObject
	* addEdgeObject
* Received new function 'getNodeID' from '../parse-graph.js' as 'addNodeDefinition'

---

**./src/parse-graph.js**
* Moved the 'getNodeID' function to 'graphTasks' as 'addNodeDefinition'
* performInputParsing
	* Moved 'parseRes' definition to its own function: 'defineGraphObject' in 'graphTasks'
* loopGraphParts
	* Removed 'currentEdge' variable.
	* Moved 'currentEdge' definition to its own function: 'addEdgeObject' in 'graphTasks'
	* Replaced calls to 'getNodeID' with 'graphTasks.addNode'
	* Hard limit of 300 edges is enforced.