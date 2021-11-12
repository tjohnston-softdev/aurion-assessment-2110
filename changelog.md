# Changelog

**./src/common/route-criteria.js**
* Changes to 'iterateCriteriaValidation'
	* Renamed 'resultObject' parameter to 'validResultObj'
* Changes to 'checkValueType'
	* 'checkRes' is now a boolean.
	* Result is valid if 'givenObj' is an existing, non-null object.
* Changes to 'readCriteria'
	* Declared 'resultObject' parameter.
	* Renamed 'typeFlag' variable to 'correctType'
	* Replaced `typeFlag > 0` with `correctType === true`

---

**./src/common/possible-criteria-validation.js**
* Removed valid `criteriaObj === null` clauses from functions:
	* checkCompleteNumberSign
	* checkIncompleteNumberSign