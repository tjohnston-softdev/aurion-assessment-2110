# Changelog

**./src/common/enum/criteria-types.js**
* Defined 'TEMPLATE' type.

---

**./src/common/route-criteria.js**
* Declared 'maxStringLength' global.
* Wrote new function 'defineTemplateCriteria'
	* Constructor for 'TEMPLATE' type.
	* Inputs syntax string and repeat boolean.
	* Compiled into a full RegExp object after inspection.
* Wrote new function 'handleTemplate'
	* Validates template string type and length.
	* Does not validate or compile the RegExp itself.
* Expanded IF structure in 'readCriteria' to include 'TEMPLATE' criteria types.
* Changes to 'checkValueType'
	* Renamed 'valueType' variable to 'givenType'

---

**./src/common/possible-criteria-validation.js**
* Changes to 'loopCriteriaComplete'
	* Expanded IF structure to consider 'TEMPLATE' criteria.
	* Route template will be validated upon completion.
	* Marked with "TODO" comment.
* Changes to 'loopCriteriaComplete'
	* Expanded IF structure to consider 'TEMPLATE' criteria.
	* Validation is skipped as the route is incomplete.