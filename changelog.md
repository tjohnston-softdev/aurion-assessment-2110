# Changelog

**./src/common/enum/possible-route-tasks.js**
* Removed all existing options except for 'ONE_WAY'
* Defined new option 'START_END'

---

**./src/test-common/route-check-parameters.js**
* Removed functions:
	* defineSingleNodeObject
	* defineMultipleNodesObject
* Renamed 'defineRouteTypeObject' function to 'defineStartEndObject'

---

**./src/test-common/possible-route-results.js - loopRoutes**
* Removed scenarios:
	* START_SINGLE
	* START_MULT
	* END_SINGLE
	* END_MULT
* Replaced 'testScenarios.ROUTE_TYPE' reference with 'testScenarios.START_END'

---

**./test-parts/test-possible-routes-valid.js**
* Removed test groups:
	* "Start Node" (handleStartNode)
	* "End Node" (handleEndNode)
* Renamed test group: "Route Types" (handleRouteTypes) ---> "Start-End Nodes" (handleStartEndNodes)