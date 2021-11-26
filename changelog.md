# Changelog

**./src/common/possible-route-tasks.js**
* Wrote new function 'filterValidCompleteRoutes'
	* Similar to 'countValidCompletedRoutes'
	* Removes invalid routes rather than counting the valid ones.
* 'filterValidCompleteRoutes' is called publicly as 'filterValidRoutes'
* Removed 'countValidRoutes' export.
* Removed "Count number of valid complete routes." comment.
* Commented out 'countValidCompletedRoutes'

---

**./src/possible-routes.js**
* Changes to 'performMainSearch'
	* Removed 'searchRes' variable.
	* Added call to 'routeTasks.filterValidRoutes'
	* 'completedRoutes' is now returned after the valid routes have been filtered.
* Changes to 'findPossibleRoutes'
	* Successful result now returns array of valid complete routes.
	* The length represents the count.
	* Infinity and Zero returns remain as-is.

---

**./cases.js - 6, 7, 10**
* Replaced 'actualValue' argument with 'actualValue.length' when calling 'setOutputObject'

---

**./test-parts/test-possible-routes.js**
* For result comparison, 'resultValue.length' is now used instead of 'resultValue' in tests:
	* "Correct Output - Single"
	* "Correct Output - Multiple"