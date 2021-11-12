# Changelog

**./src/common/route-criteria.js**
* Renamed 'validateRouteCriteriaOriginal' function to 'readCriteria'
* Wrote new functions:
	* 'validateRouteCriteria' - Main function.
	* 'iterateCriteriaValidation' - Secondary loop function.
* Actual validation is ignored for now. This is only the loop structure.

---

**./src/common/possible-criteria-validation.js**
* New file - Separate file for route validation.
* Functions for both complete and incomplete contexts.
* Split from '../possible-routes.js'

---

**./src/possible-routes.js**
* Added requirement for './common/possible-criteria-validation'
* Moved functions to 'possibleCriteriaValidation'
	* 'checkCompletedRouteCriteriaMatch' as 'checkCompleteNumberSign'
	* 'checkIncompleteRouteCriteriaMatch' as 'checkIncompleteNumberSign'
* Changes to 'findPossibleRoutes'
	* Removed 'stopCountCriteria' and 'distanceCriteria' parameters.
	* Declared 'criteriaListObject' parameter.
	* Removed 'countValid' and 'distValid' variables.
	* Declared 'criteriaValidation' variable.
	* Replaced `countValid === true && distValid === true` with `criteriaValidation.successful === true`
	* Removed `else if (nodesValid === true && countValid === true)`
	* Replaced "INVALID COUNT CRITERIA" with "INVALID CRITERIA"
	* Added comment under `else if (nodesValid === true)`
* Changes to 'performInitialSequence' and 'performMainSearch'
	* Removed 'stopCountCritObject' and 'distanceCritObject' parameters.
	* Declared parameters: 'criteriaListObj' and 'ignoreCriteria'
* Changes to 'iterateRoutes'
	* Removed 'stopCriteriaObj' and 'distCriteriaObj' parameters.
	* Declared parameters: 'critListArr' and 'ignoreCrit'
* Changes to 'validateCompletedRoute'
	* Removed 'stopCriteria' and 'distCriteria' parameters.
	* Declared 'criteriaList' and 'skipCriteria' parameters.
	* Removed 'stopCountMatch' and 'distanceMatch' variables.
	* Declared 'criteriaMatch' variable.
	* 'criteriaMatch' is assigned using 'possibleCriteriaValidation.loopComplete'
	* Replaced `stopCountMatch === true && distanceMatch === true` with `criteriaMatch === true`
* Changes to 'readIncompleteRoute'
	* Removed 'stopCriteria' and 'distCriteria' parameters.
	* Declared 'criteriaList' and 'skipCriteria' parameters.
	* Removed 'stopCountMatch' and 'distanceMatch' variables.
	* Declared 'criteriaMatch' variable.
	* 'criteriaMatch' is assigned using 'possibleCriteriaValidation.loopIncomplete'
	* Replaced `stopCountMatch === true && distanceMatch === true` with `criteriaMatch === true`

---

**./cases.js**
* Changes to 'runTestCase6' and 'runTestCase7'
	* Renamed 'routeStopCriteria' variable to 'routeStops'
	* Declared 'searchCriteria' variable. - Array for 'routeStops'
	* Updated 'possibleRoutes.findRoutes' call arguments.
* Changes to 'runTestCase10'
	* Renamed 'routeDistanceCriteria' variable to 'routeDist'
	* Declared 'searchCriteria' variable. - Array for 'routeStops'
	* Updated 'possibleRoutes.findRoutes' call arguments.