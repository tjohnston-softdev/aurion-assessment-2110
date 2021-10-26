# Changelog

**./src/common/possible-route-tasks.js**
* Wrote new function 'checkDeriveAllowed'
	* Checks whether a new route can be derived using a destination.
	* Considers whether the node has been visited, and whether backtracking is allowed.
* Declared the following in 'deriveNewRoutes'
	* 'allowBack' parameter. - Refers to backtracking.
	* 'currentVisited' variable. - If current destination has been visited.
	* 'currentUpdate' variable. - If route can be successfully derived.
	* 'offsetIndex' - Index where the new route will be inserted.
* Other changes to 'deriveNewRoutes'
	* 'currentNewRoute' is only updated and added if 'currentUpdate' is true.
	* When assigning 'currentInsertIndex', the offset is governed by 'offsetIndex' and not the loop itself.
	* 'offsetIndex' is incremented every time a route is successfully derived.

---

**./src/possible-routes.js**
* Changes to 'iterateRoutes'
	* Declared 'endReached' variable. Indicates if end node has been reached during this loop.
	* 'endReached' is returned, and does not take criteria into account.
	* Declared 'allowBacktracking' parameter. Indicates if backtracking is allowed.
	* Added 'allowBacktracking' as an argument when calling 'routeTasks.deriveNew'
* Wrote new function 'performInitialSequence'
	* Checks if the end node is reachable.
	* Prevents infinite loop for impossible routes.
* Differences between 'performInitialSequence' and 'performSearch'
	* Does not allow backtracking.
	* Stops iterating routes after end reached.
	* Can only iterate up to `graphObj.nodes.length \* 1.15` times, rounding up.
* Changes to 'performSearch'
	* When calling 'iterateRoutes', backtracking argument is true.
	* Declared 'loopEnabled' parameter. Based on result of 'performInitialSequence'
	* Loop will only perform if 'loopEnabled' is true.
* Changes to 'findPossibleRoutes'
	* Declared 'endReachPossible' variable.
	* Call 'performInitialSequence' before 'performSearch'
	* 'endReachPossible' consumes result of 'performInitialSequence'
	* Added 'endReachPossible' as argument to 'performSearch'

---

**./src/test-parts/test-pathfinding-input.js - handlePossibleRoutes**
* Uncommented "Impossible Route" test case.
	* Outputs result to console.
	* Valid by default.