# Changelog

**./src/common/graph-tasks.js**
* Wrote new function 'getAdjacentEdgesByNode'
	* Gets index numbers of edges that have the given node as origin.
	* Remember that edges are only one-way.

---

**./src/shortest-route.js - loopPathfinding**
* Removed:
	* `console.log(currentVisitingNode);`
	* `dsktraInfoObj.nodes.reverse();`
	* `console.log("");`
	* `console.log(currentVisitingNode);`
* Properly declared 'currentDestinationEdges' variable.
	* Assigned with 'graphTasks.getAdjacentEdges'
	* After visiting node was retrieved successfully.
* Display:
	* Graph edge array.
	* Visiting node ID.
	* Destination edges array.
* Still only iterates once.