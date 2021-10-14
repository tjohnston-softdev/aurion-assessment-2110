# Changelog

**./src/common/dsktra-tasks.js**
* Commented out 'distanceFromStart' assignment for start nodes. (setNodeTable)
* Removed 'visited' sort column. (sortNodeTable)
	* Only sort by 'distanceFromStart'
	* 'getCurrentVisitingNode' is responsible for isolating the unvisited node with the least distance.
* Wrote new function 'evaluateAdjacentNodes' - Updates node distances in current Dijkstra iteration.

---

**./src/shortest-route.js**
* Removed console output from 'loopPathfinding'
* Commented out 'loopPathfinding' call.
* Wrote new function 'visitStartNode'
	* First iteration of Dijkstra pathfinding.
	* Visits the starting node.
	* This is a separate function to account for closed routes.
* Added call to 'visitStartNode' in 'findShortestRoute'
* Console output is the nodes table after first iteration (visitStartNode)