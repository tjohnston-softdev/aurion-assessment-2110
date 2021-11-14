# Changelog

**./src/common/route-criteria.js**
* checkValueType
	* 'checkRes' is now assigned in-line and not with an `IF` structure.
* handleNumberSign
	* Declared 'resObj', 'critInd', and 'critDesc' parameters.
	* Expanded `IF` structure to handle invalid cases, writing custom error messages.
	* 'handleRes' variable is no longer returned.
	* Removed "Criteria number must be positive." comment.
* readCriteria
	* Declared 'criteriaIndex' parameter.
	* Updated 'handleNumberSign' calls with new arguments.
	* Removed 'validationResult' variable.
	* This function no longer returns.
	* Removed `else if (typeFlag === 0)` clause.
	* Moved "Invalid object type." comment to the `else` clause.
	* Expanded `IF` structure to handle 'unknown criteria' and 'invalid value' cases, writing custom error messages.
* iterateCriteriaValidation
	* Renamed 'criteriaIndex' variable to 'loopIndex'
	* Removed 'currentValid' variable.
	* Added call to 'readCriteria' from loop.
* validateRouteCriteria
	* Added custom error message for invalid array.

---

**./src/common/possible-criteria-validation.js**
* Reduced whitespace before `IF` structure. (checkIncompleteNumberSign)

---

**./src/common/possible-criteria-message.js**
* New file - Writes output message for invalid 'possible routes' criteria.

---

**./src/possible-routes.js**
* Added requirement for './common/possible-criteria-message'
* Added call to 'possibleCriteriaMessage' for when 'criteriaValidation' is invalid. (findPossibleRoutes)