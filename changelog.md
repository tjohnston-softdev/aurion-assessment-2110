# Changelog

**./src/common/dsktra-tasks.js**
* Removed commented out 'distanceFromStart' assignment from 'setNodeTable'
* Removed 'closedRoute' property from 'defineDijkstraInfo'
* Removed the 'setClosedRoute' function.

---

**./src/shortest-route.js**
* Renamed 'loopPathfinding' function to 'visitOtherNodes'
* Wrote new function 'checkRouteSuccessful'
	* Used to check if pathfinding was successful.
	* Possible route between start and end nodes.
	* If successful, output distance.
	* Otherwise, output message.
* Changes to 'findShortestRoute'
	* Removed 'dsktraTasks.setNodes' call.
	* Declared 'shortRouteRes' variable.
	* If the start or end nodes are missing, output message.
	* Return 'shortRouteRes'

**./submission.js - runShortestRouteTestCases**
* Output 'case8' to console.