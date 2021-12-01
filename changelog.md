# Changelog

**./src/common/enum/possible-route-tests.js**
* Defined new options:
	* START_SINGLE
	* START_MULT
* Removed 'SCENARIO_N' placeholder.

---

**./src/test-common/route-check-parameters.js**
* New file
	* Constructors for 'result parameter' objects.
	* Used for valid 'possible route' pathfinding unit tests.
	* Only contains 'Single Node' and 'Multiple Nodes' for start-end conditions.

---

**./src/test-common/possible-route-results.js**
* Declared parameters:
	* inputParasObj (checkResultObject)
	* parasObj (loopRoutes)
* Modified 'loopRoutes' to support scenarios:
	* START_SINGLE
	* START_MULT

---

**./test-parts/test-possible-routes-valid.js**
* Added new requirement: '../src/test-common/route-check-parameters'
* Added `null` argument to 'routeResults' call in 'handleOneWay'
* Defined new unit test group: "Start Node" (handleStartNode)
	* Single
	* Multiple
	* All