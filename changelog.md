# Changelog

**./src/possible-routes.js - findPossibleRoutes**
* Moved assignments to `templateValidation.successful` IF block:
	* searchPrepared
	* preparedStartNodes
* Added `criteriaValidation.successful === true` block to result IF structure.
	* Writes output message for invalid templates.
* The `else` block for the result IF structure still writes the output message for input validation.
* Corrected invalid references:
	* 'graphObj' to 'graphObject'
	* 'criteriaListObj' to 'criteriaListObject'

---

**./src/common/possible-route-template.js - compileTemplateObjects**
* Corrected invalid references:
	* 'givenNodes' to 'givenNodeList'
	* 'givenCriteria' to 'givenCriteriaArray'