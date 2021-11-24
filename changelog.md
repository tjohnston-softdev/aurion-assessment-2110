# Changelog

**./src/common/possible-route-tasks.js**
* Added 'templatePointers' result property to 'inspectRouteCriteria'
* Changes to 'loopCriteriaInspection'
	* Expanded IF structure to consider 'TEMPLATE' criteria.
	* On 'TEMPLATE', add 'criteriaIndex' to 'resultObj.templatePointers'

---

**./src/common/possible-route-template.js**
* New file - Prepares and validates 'TEMPLATE' criteria.
* Same syntax as RegExp but with custom character groups for start/end nodes.

---

**./src/possible-routes.js**
* Added requirement for './common/possible-route-template'
* Changes to 'findPossibleRoutes'
	* Declared 'templateValidation' variable.
	* Moved 'searchPrepared' variable to before 'preparedStartNodes'
	* Commented out assignments: 'searchPrepared', 'preparedStartNodes'
	* Assigned 'templateValidation' using 'routeTemplate'
	* New block: `if (templateValidation.successful === true)` - Only a placeholder for now.