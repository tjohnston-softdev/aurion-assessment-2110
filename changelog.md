# Changelog

**./src/possible-routes.js**
* Changes to 'performInitialSequence'
	* Renamed 'prepNodes' parameter to 'prepData'
	* Renamed 'routeBacklog' to 'currentBacklog'
	* 'currentBacklog' is declared as empty.
	* Renamed 'exploredRoutes' to 'currentExplored'
	* Renamed 'loopNumber' to 'currentIteration'
	* Renamed 'loopCutoff' to 'maxIterations'
	* 'maxIterations' is declared first.
	* Renamed 'sequenceFound' to 'currentFound'
	* Declared variables: 'nodeIndex', 'currentStart', 'currentLoop', 'successfulNodes'
	* Outer loop iterates over nodes in the graph.
	* Inner loop checks if a direct sequence is possible using the current node.
	* Function now returns 'successfulNodes' - Array of nodes that have a successful sequence.
* Changes to 'performMainSearch'
	* Renamed 'prepNodes' parameter to 'prepData'
	* Renamed 'loopEnabled' parameter to 'startPoints'
	* Replaced 'routeTasks.initializeBacklog' call with 'routeTasks.initializeMultipleBacklog'
	* Removed the `loopEnabled === true` check.
	* When calling 'iterateRoutes', replace 'prepData' with 'prepData.endNodes'
* Changes to 'iterateRoutes'
	* Renamed 'pNodes' parameter to 'endList'
	* Declared 'currentEndPoint' variable.
	* Replaced `currentNode === pNodes.end` with `currentEndPoint === true || endList.length === 0`
* Changes to 'findPossibleRoutes'
	* Declared 'preparedStartNodes' variable.
	* Wrote new `IF` structure to coordinate pathfinding.
	* If input is safe, perform search.
	* If a cutoff has not been set based on the criteria, return Infinity.
	* Restored error message into new structure.
	* Moved 'performInitialSequence' and 'performMainSearch' calls into new structure.
	* Removed parameters: 'startNode', 'endNode'

---

**./src/common/possible-criteria-validation.js**
* Changes to 'loopCriteriaComplete' and 'loopCriteriaIncomplete'
	* Checks for 'START_NODE' and 'END_NODE' conditions.
	* Criteria is ignored and assmed True.