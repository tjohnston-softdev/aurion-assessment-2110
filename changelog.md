# Changelog

**./src/common/possible-route-tasks.js**
* Changes to 'checkDeriveAllowed'
	* 'visitStatus' is now a variable instead of a parameter.
	* Declared new parameters: 'tgtNode', 'newRoute', 'eNodes'
	* Declared new variable 'endStatus' - If target node is a possible end point.
	* If the target node is an end point, it can be visited regardless of backtracking.
	* If there are no end nodes, always visit.
* Changes to 'deriveNewRoutes'
	* Declared 'routeEnds' parameter.
	* Moved the 'currentVisited' variable into 'checkDeriveAllowed' as 'visitStatus'

---

**./src/possible-routes.js - iterateRoutes**
* Added 'endList' argument to 'routeTasks.deriveNew' call.