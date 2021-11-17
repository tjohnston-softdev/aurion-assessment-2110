# Changelog

**./src/possible-routes.js - findPossibleRoutes**
* Removed the 'endReachPossible' variable.
	* References are still commented out.
* Renamed the 'targetNodesObject' variable to 'criteriaInspection'
* Declared variables:
	* searchPrepared
	* infiniteRoutes
* Moved 'possibleCriteriaMessage.prepareText' call out of the `IF` structure.
	* Now sits at the end of the function.
	* Commented out for now.
* Removed `else` block.

---

**./src/common/possible-route-tasks.js**
* Added new requirement: './enum/num-signs'
* Renamed functions:
	* 'setRouteTargetNodes' to 'inspectRouteCriteria'
	* 'loopTargetCriteria' to 'loopCriteriaInspection'
* Other changes to 'inspectRouteCriteria'
	* Renamed 'start' result property to 'startNodes'
	* Renamed 'end' result property to 'endNodes'
	* Declared 'cutoffSet' result property.
* Other changes to 'loopCriteriaInspection'
	* Declared new variable 'currentType' - Shorthand for current criteria type.
	* Declared new variable 'cutoffSigns' - These limit the number of stops or total distance.
	* Removed stray 'currentUsed' reference.
	* Added clauses to handle 'STOP_COUNT' and 'TOTAL_DISTANCE' criteria, for determining whether cutoff is in effect.