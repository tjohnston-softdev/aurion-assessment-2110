# Changelog

**./src/common/**
* New files:
	* 'num-signs.js' - Enum definitions for number signs. (Greater than, Less than, etc)
	* 'route-criteria.js' - Definition for route criteria objects when searching for all possibilities.
	* 'possible-route-tasks.js' - Secondary functions for searching all possible routes.

---

**./src/possible-routes.js**
* New file - Searches for all possible routes in the graph from A to B meeting certain criteria:
	* Number of stops
	* Total distance

---

**./submission.js**
* New requirements:
	* ./src/possible-routes
	* ./src/common/route-criteria
	* ./src/common/num-signs
* Renamed existing functions:
	* 'runExactRouteTestCases' to 'callExactRouteTestCases'
	* 'runShortestRouteTestCases' to 'callShortestRouteTestCases'
* Declared new global objects for route criteria test cases:
	* routeStopCriteria
	* routeDistCriteria
* Wrote new function 'callPossibleRouteByStopCountTestCases'
	* Executes test case #6
	* Called from 'runSubmission'
* Changed "10" comment to "Test Case 10"
* Current console output is all completed routes for test case #6