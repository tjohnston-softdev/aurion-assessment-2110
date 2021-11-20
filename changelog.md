# Changelog

**./test-parts/test-exact-route.js**
* New file - 'Exact Route' unit tests have been moved to their own file.
* Split from 'test-pathfinding-input.js'
* 'noRouteMsg' is now a local variable of 'handleExactRoute' instead of a global.
* Changed "Exact route." comment to "Main Function"
* Revised 'callExactRouteMissingGraph' header comment.
	* Before: "Attempts 'exact route' pathfinding [...]"
	* After: "Attempts pathfinding on a missing graph."

---

**./test-parts/test-shortest-route.js**
* New file - 'Shortest Route' unit tests have been moved to their own file.
* Split from 'test-pathfinding-input.js'
* Moved global variables to 'handleExactRoute'
	* unknownNodesMsg
	* noRouteMsg
* Changed "Shortest route." comment to "Main Function"
* Revised 'callShortestRouteMissingGraph' header comment.
	* Before: "Attempts 'shortest route' pathfinding [...]"
	* After: "Attempts pathfinding on a missing graph."

---

**./test-parts/test-possible-routes.js**
* New file - 'Possible Routes' unit testing has been moved to its own file.
* Split from 'test-pathfinding-input.js'
* 'unknownNodesMsg' is now a local variable of 'handlePossibleRoutes' instead of a global.
* Changed "Possible routes." comment to "Main Function"
* Revised 'callPossibleRoutesMissingGraph' header comment.
	* Before: "Attempts 'possible routes' pathfinding [...]"
	* After: "Attempts pathfinding on a missing graph."

---

**./test-parts/test-pathfinding-input.js**
* Removed header comment.
* Removed "Main function." comment.
* Replaced main description with placeholder.
* Moved functions to 'test-exact-route.js'
	* handleExactRoute
	* callExactRouteMissingGraph
* Moved functions to 'test-shortest-route.js'
	* handleShortestRoute
	* callShortestRouteMissingGraph
* Moved functions to 'test-possible-routes.js'
	* handlePossibleRoutes
	* callPossibleRoutesMissingGraph
* Removed all requirements except for:
	* mocha
	* chai
	* expect
* This file still works but the test is only a placeholder.