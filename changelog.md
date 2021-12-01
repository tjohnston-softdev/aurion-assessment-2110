# Changelog

**./src/common/enum/possible-route-tasks.js**
* Defined 'ROUTE_TYPE' option.

---

**./src/test-common/route-check-parameters.js**
* Renamed 'graphNodes' parameters to 'inpGraphNodes'
* Split loop in 'defineMultipleNodesObject' to its own function 'mapNodes'
* Wrote new function 'defineRouteTypeObject'

---

**./src/test-common/possible-route-results.js - loopRoutes**
* Expanded to consider 'ROUTE_TYPE'

---

**./test-parts/test-possible-routes-valid.js**
* Started writing new test group "Route Types" (handleRouteTypes)
* Most tests have been implemented and are working properly.
* Not currently enabled. The call to 'handleRouteTypes' is commented out.