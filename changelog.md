# Changelog

**./src/possible-routes.js - findPossibleRoutes**
* Initial sequencing is performed immediately after criteria validation.
* Revised result IF structure.
	* If there are possible sequences with a known cutoff, perform main search.
	* If there are possible sequences without a cutoff, return infinity.
	* If there are no possible sequences, return zero.
	* Otherwise, input is invalid. Return error message.

---

**./test-parts/test-possible-routes.js - runTests**
* Removed 'routeStopCount' criteria from "Impossible Route"