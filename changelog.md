# Changelog

**./src/common/route-criteria.js**
* Added plural to header comment.
* Defined new global object 'criteriaTypesEnum'
	* Contains list of supported criteria types.
	* Criteria itself remains unchanged for now.
	* Called publicly as 'criteriaTypes'
* Wrote new functions:
	* defineStopCountCriteria
	* defineTotalDistanceCriteria
	* setNumberSign
* Removed the 'defineRouteCriteria' function.
* Renamed 'handleCriteriaObject' to 'handleNumberSign'

---

**./cases.js**
* Replaced 'routeCriteria.defineCriteria' calls as follows:
	* routeCriteria.defineStopCount (runTestCase6, runTestCase7)
	* routeCriteria.defineTotalDistance (runTestCase10)