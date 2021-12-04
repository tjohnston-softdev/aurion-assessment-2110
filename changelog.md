# Changelog

**./src/common/enum/possible-route-tests.js**
* Added new scenarios:
	* TEMPLATE_EXACT
	* TEMPLATE_WILDCARD

---

**./src/test-common/possible-route-templates.js**
* Added new requirement '../common/enum/possible-route-tests'
* Changes to 'followExactTemplate'
	* Removed 'pathResObj' parameter.
	* Removed 'nodeListObj' parameter.
	* Declared 'stepArr' parameter.
	* Declared 'nodeArr' parameter.
	* Removed 'routeObject' variable.
	* Replaced 'routeObject.route.steps' references with 'stepArr'
	* Replaced 'nodeListObj' references with 'nodeArr'
	* Renamed 'currentVisitNodeID' variable to 'currentVisitID'
	* Renamed 'currentVisitNodeChar' variable to 'currentVisitChar'
* Wrote new functions:
	* checkResultObject
	* followWildcard
* 'followExactTemplate' is no longer public.
* 'checkResultObject' is called publicly as 'checkObject'

---

**./src/test-common/possible-route-results.js - checkOneWaySequence**
* Error is thrown once the loop is aborted, and not afterwards.

---

**./test-parts/possible/valid/template-criteria.js**
* Changes to "Exact"
	* Removed call to 'possibleRouteTemplates.followExact'
	* Added call to 'possibleRouteTemplates.checkObject'
* Changes to "Wildcard"
	* Removed `console.log`
	* Added call to 'routeResults.checkObject'
	* Added call to 'possibleRouteTemplates.checkObject'