# Changelog

**./src/common/possible-criteria-validation.js - loopCriteriaComplete**
* Declared 'givenNodesArray' parameter.

---

**./src/exact-route.js**
* Renamed function parameters:
	* 'graphObject' to 'inputGraphObject' (getRouteDistance)
	* 'graphObj' to 'graphObject' (loopSteps)

---

**./src/shortest-route.js**
* Renamed function parameters:
	* 'graphObject' to 'inputGraphObject' (findShortestRoute)
	* 'graphObj' to 'graphObject' (visitStartNode, visitOtherNodes)

---

**./src/possible-routes.js**
* Renamed function parameters:
	* 'graphObject' to 'inputGraphObject' (findPossibleRoutes)
	* 'graphObj' to 'graphObject' (performInitialSequence, performMainSearch)
* Changes to 'iterateRoutes'
	* Removed 'graphEdgeArr' parameter.
	* Declared 'graphObj' parameter.
	* Replaced 'graphEdgeArr' references with 'graphObj.edges'
* Changes to 'validateCompletedRoute'
	* Declared 'graphNodesList' parameter.