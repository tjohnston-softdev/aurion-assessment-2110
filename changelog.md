# Changelog

**./src/possible-routes.js - findPossibleRoutes**
* Removed the 'infiniteRoutes' variable.
* Swapped 'searchPrepared' and 'criteriaInspection' variable order.
* Removed "Input valid, perform algorithm." comment.

---

**./src/common/possible-route-tasks.js - loopCriteriaInspection**
* 'STOP_COUNT' and 'TOTAL_DISTANCE' criteria have been separated.
* 'cutoffSet' is only assigned once.
	* If it has already been set True, the relevant criteria will be ignored in the future.