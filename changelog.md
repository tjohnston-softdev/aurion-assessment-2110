# Changelog

**./test-parts/test-pathfinding-input.js**
* Corrected error throwing syntax in 'checkOutputDistanceNumber'
* New global variable 'badCriteriaMsg'
* Changes to 'callShortestRouteMissingGraph'
	* If the `try` is successful, 'givenMessage' is assigned blank.
* Added new requirements:
	* ../src/common/num-signs
	* ../src/common/route-criteria
* Commented out calls:
	* handleExactRoute
	* handleShortestRoute
* New secondary functions:
	* checkMultiplePossibleRoutes
	* callPossibleRoutesMissingGraph
* Wrote unit testing for 'possible routes' input. (handlePossibleRoutes)
	* Most cases implemented.
	* 'Impossible Route' results in infinite loop.

---

**./test/index.js**
* Commented out all calls except for 'testPathfindingInput'