# Changelog

**./src/common/enum/**
* Added header comment to 'possible-route-tests.js'
* Reduced whitespace in:
	* criteria-types.js
	* num-signs.js

---

**./src/common/dsktra-tasks.js**
* Increased whitespace between header comment and 'defineDijkstraInfo'

---

**./src/common/possible-criteria-message.js**
* Added header comment.

---

**./src/common/possible-criteria-validation.js**
* Added header comment.
* Commented functions:
	* loopCriteriaComplete
	* loopCriteriaIncomplete
	* writeRouteString
	* loopCriteriaInspection
* Added header comments to functions:
	* checkCompleteNumberSign
	* checkIncompleteNumberSign
	* checkCompleteTemplate

---

**./src/common/possible-route-tasks.js**
* Commented new functions:
	* inspectRouteCriteria
	* initializeSingleRouteBacklog
	* initializeMultipleRoutesBacklog
	* loopCriteriaInspection
	* addNodeToTarget
	* defineRouteObject
	* checkDeriveAllowed
* Added outcome comments to 'filterValidCompleteRoutes'
* 'cutoffSigns' is now declared and populated separately. (loopCriteriaInspection)

---

**./src/common/possible-route-template.js**
* Added comments to file.
* 'loopTemplates' variables are now declared and assigned separately:
	* startGroup
	* endGroup

---

**./src/common/route-criteria.js**
* Added comments to new functions:
	* validateRouteCriteria
	* iterateCriteriaValidation
	* handleTemplate
	* setTargetNode
	* setNumberSign
* Revised comments in existing functions:
	* handleTargetNode
	* handleNumberSign
* Changed 'readCriteria' header comment.
	* Before: "Validate object."
	* After: "Validate criteria object."