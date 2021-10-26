# Changelog

**./test-parts/test-pathfinding-input.js**
* Added new edge to example graph: `G --> H (9)`
	* It is impossible to reach these nodes.
	* Used for 'shortest route' unit test.
	* Impossible for Dijkstra.
	* Does not conflict with existing unit tests.
* Wrote unit tests for 'shortest route' pathfinding. (handleShortestRoute)
* Wrote secondary function to `try-catch` missing graph for shortest route. (callShortestRouteMissingGraph)