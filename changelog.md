# Changelog

**./src/common/possible-route-tasks.js - checkDeriveAllowed**
* Declared new variables:
	* 'startNode' - Start node of the base route.
	* 'startEnd' - Indicates if this start node is also an end node.
* Re-wrote IF structure, commenting out the original.
	* If backtracking is enabled, the node can be visited.
	* If the start node is also a specified end node, it can still be visited even without backtracking.
	* Otherwise, a node cannot be re-visited.
	* If the node has not been visited, we can.

---

**./cases.js**
* Quickly wrote debug code for 'ONE_WAY' pathfinding without any additional criteria.