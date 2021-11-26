# Changelog

**./src/common/possible-criteria-validation.js**
* Wrote new functions:
	* checkCompleteTemplate
	* writeRouteString
* Changes to 'loopCriteriaComplete'
	* On `criteriaTypes.TEMPLATE`, call 'checkCompleteTemplate'
	* Removed "TODO" comment.

---

**./src/possible-routes.js**
* Updated 'stop count' IF condition in 'validateCompletedRoute'
	* Before: `stopCount > 0`
	* After: `compRoute.steps.length > 1`
* Changes to 'performInitialSequence'
	* Replaced 'graphObject.edges' with 'graphObject'
	* Declared 'endNodesList' variable. - Shortcut for 'inspectObj.endNodes'
* Changes to 'performMainSearch'
	* Replaced 'graphObject.edges' with 'graphObject'