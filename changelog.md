# Changelog

**./src/common/possible-route-tasks.js - deriveNewRoutes**
* Function now returns `offsetIndex - 1`
* Represents number of new routes created.

---

**./src/possible-routes.js - iterateRoutes**
* Commented out `currentOffset = currentAdjEdges.length;`
* 'currentOffset' now consumes result of 'routeTasks.deriveNew'