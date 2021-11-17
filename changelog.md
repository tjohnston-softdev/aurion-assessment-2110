# Changelog

**./src/common/possible-route-tasks.js**
* Split 'parseStartEndNodes' into two functions:
	* 'readStartNode', which is optional.
	* 'readEndNode', which is required.
* Removed variables from 'parseStartEndNodes'
	* startMatchFlag
	* endMatchFlag
* Wrote new function 'validateNodeInput' - Validates node input under new structure.
* Removed 'validateStartEndNodes' function.
* Changes to 'initializeRouteBacklog'
	* Renamed 'sNode' parameter to 'sNodeOld'
	* Split the 'startRoute' object definition to its own function 'defineRouteObject'
	* Removed public export.
* Wrote two new functions based on 'initializeRouteBacklog'
	* 'initializeSingleRouteBacklog', basically the same as the original.
	* 'initializeMultipleRoutesBacklog', starts from multiple nodes in the graph.

---

**./src/common/possible-routes.js - findPossibleRoutes**
* Removed 'nodesValid' variable.
* Declared variables: 'startNodeValid', 'endNodeValid'
* Added calls to 'routeTasks.validateNode'
* Revised IF structure to account for separate node validation.
* Removed call to 'graphTasks.getUnknownNodesText'
* Changed "Unknown nodes." comment to "Invalid end node."
* Added "Invalid start node." comment.
* Placeholder messages are returned for invalid node input.