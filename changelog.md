# Changelog

**./src/shortest-route.js - loopPathfinding**
* Removed 'iterationsMade' variable.
* Removed `if (iterationsMade === 5)` structure.
* Loop will abort when all nodes have been visited.
* After loop finishes:
	* Reset node sort order.
	* Display nodes table.