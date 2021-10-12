# Changelog

**./src/common/graph-tasks.js**
* New file - Will contain common functions for using graphs.
* Has only one function at the moment: 'getExistingEdge'
	* Copied from 'checkEdgeExists' in '../parse-graph.js'

---

**./src/parse-graph.js**
* Required './common/graph-tasks'
* Removed the 'checkEdgeExists' function.
	* Re-implemented in './common/graph-tasks' as 'getExistingEdge'
* Changes to 'loopGraphParts'
	* 'currentExists' is now an object variable.
	* Replaced `currentExists !== true` with `currentExists === null`
	* Replaced 'checkEdgeExists' call with 'graphTasks.getEdge'