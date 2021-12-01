# Changelog

**./src/common/enum/possible-route-tests.js**
* Defined new options:
	* END_SINGLE
	* END_MULT

---

**./src/test-common/possible-route-results.js**
* Modified 'loopRoutes' to consider scenarios:
	* END_SINGLE
	* END_MULT
* Simplified `undefined` and `null` checks in 'checkBaseSchema'

---

**./test-parts/test-possible-routes-valid.js**
* Changed 'searchCriteria' in "Start Node" - "Single" to use correct variable order.
* Started writing new test group "End Node" (handleEndNode)
	* Same basic structure as "Start Node"
	* "Single" test works successfully.
	* "Multiple" and "All" are commented out due to bugs.