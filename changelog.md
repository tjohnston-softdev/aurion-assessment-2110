# Changelog

**./cases.js**
* New file
	* Test cases will be performed here rather than in the main file.
	* Equally accessible between main submission and unit tests.
	* Returns both expected and actual output.

---

**./submission.js**
* Added new requirement: './cases'
* Removed requirements:
	* exactRoute
	* shortestRoute
	* possibleRoutes
	* routeCriteria
	* numSigns
* Removed globals:
	* routeStopCriteria
	* routeDistCriteria
* Wrote new function 'callTestCases'. Merges the following:
	* callExactRouteTestCases
	* callPossibleRouteByStopCountTestCases
	* callShortestRouteTestCases
	* callPossibleRouteByDistanceTestCase

---

**./src/result-display.js**
* Revised to use new test case structure.