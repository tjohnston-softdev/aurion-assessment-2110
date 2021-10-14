# Changelog

**./src/shortest-route.js**
* Changes to 'loopPathfinding'
	* Declared 'currentID', local variable for visiting node ID.
	* Declared 'currentDistance', local variable for node distance.
	* Renamed 'currentDestinationEdges' to 'currentAdjEdges'
	* Assigned 'currentVisitingNode.visited' as True after successful evaluation.
* Changes to 'visitStartNode'
	* Renamed 'adjacentEdges' to 'adjEdges'
	* Removed `console.log`
* Uncommented 'loopPathfinding' call.
* Console output is the nodes table after second iteration (loopPathfinding)
