# Changelog

**./src/common/enum/possible-route-tests.js**
* Defined new scenarios:
	* STOPS_MIN
	* STOPS_MAX
	* STOPS_EXACT
	* STOPS_BETWEEN

---

**./src/test-common/route-check-parameters.js**
* Wrote new constructor functions:
	* defineNumberObject
	* defineRangeObject

---

**./src/test-common/possible-route-results.js - loopRoutes**
* Added support for scenarios:
	* STOPS_MIN
	* STOPS_MAX
	* STOPS_EXACT
	* STOPS_BETWEEN

---

**./test-parts/possible/valid/stop-count.js**
* New file - Unit test group for number of stops along a route.
	* Minimum
	* Maximum
	* Exact
	* Between

---

**./test-parts/possible/invalid/template-criteria.js**
* Changed public export name from 'runTests' to 'callTests'

---

**./test-parts/test-possible-routes.js**
* Added new requirement: './possible/valid/stop-count'
* Made call to 'validStopCount'
* Corrected requirement paths:
	* invalidSearchArgs
	* invalidStopDistCriteria
	* invalidTemplateCriteria