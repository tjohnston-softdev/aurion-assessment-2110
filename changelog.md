# Changelog

**./test-parts/test-pathfinding-input.js - handlePossibleRoutes**
* Commented out tests from "Missing Graph" onwards.
* Updated 'invalidCriteria' value assignment.
	* Before: 'routeCriteria.defineCriteria'
	* After: 'routeCriteria.defineStopCount'
* Renamed variables:
	* 'stopInput' to 'routeStops'
	* 'distInput' to 'routeDist'
* Declared 'searchCriteria' variable in each of the valid tests.
* Updated 'possibleRoutes.findRoutes' calls to match new arguments.
* Updated 'routeStops' assignments.
	* Before: 'routeCriteria.defineCriteria'
	* After: 'routeCriteria.defineStopCount'
* Updated 'routeDist' assignments.
	* Before: 'routeCriteria.defineCriteria'
	* After: 'routeCriteria.defineTotalDistance'