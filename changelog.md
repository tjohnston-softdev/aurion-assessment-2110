# Changelog

**./src/common/enum/criteria-types.js**
* Defined 'ONE_WAY' criteria.

---

**./src/common/route-criteria.js**
* Wrote new function 'defineOneWayCriteria'
* Changes to 'readCriteria'
	* Declared 'skipValidation' variable.
	* 'skipValidation' is a placeholder for when a criteria type has no input validation.
	* Modified `IF` structure to consider 'ONE_WAY' criteria.
	* 'ONE_WAY' has no validation of its own, but must have its own block anyway.

---

**./src/common/possible-criteria-validation.js**
* Modified 'loopCriteria_____' functions to handle 'ONE_WAY' criteria.

---

**./src/common/possible-route-tasks.js**
* Changes to 'inspectRouteCriteria'
	* Added 'backtrack' result property.
	* 'backtrack' is True by default, but is set to False if there is a 'ONE_WAY' criteria.
* Changes to 'loopCriteriaInspection'
	* If a 'ONE_WAY' criteria is found, set 'resultObj.backtrack' to False.

---

**./src/possible-routes.js**
* Changes to 'findPossibleRoutes'
	* Declared 'useIgnore' variable. - Shortcut for 'criteriaValidation.ignore'
* Changes to 'performInitialSequence'
	* Renamed 'prepData' parameter to 'inspectObj'
* Changes to 'performMainSearch'
	* Renamed 'prepData' parameter to 'inspectObj'
	* Declared 'endNodesList' variable. - Shortcut for 'inspectObj.endNodes'
	* Declared 'useStepBack' variable. - Shortcut for 'inspectObj.backtrack'
	* Replaced `true` argument for 'iterateRoutes' call with `useStepBack`