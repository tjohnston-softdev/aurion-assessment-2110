# Changelog

**./src/common/enum/possible-route-tests.js**
* Defined new scenarios:
	* DIST_MIN
	* DIST_MAX
	* DIST_EXACT
	* DIST_BETWEEN

---

**./src/test-common/possible-route-results.js - loopRoutes**
* Added support for scenarios:
	* DIST_MIN
	* DIST_MAX
	* DIST_EXACT
	* DIST_BETWEEN

---

**./test-parts/possible/valid/total-dist.js**
* New file - Unit test group for route total distance.
* Same structure as 'stop-count.js'

---

**./test-parts/test-possible-routes.js**
* New requirement: './possible/valid/total-dist'
* Added call to 'validTotalDist'