# Changelog

**./cases.js**
* Commented out debug code for 'ONE_WAY' criteria.

---

**./src/common/enum/possible-route-tests.js**
* New file
* Definitions for 'possible routes' unit test scenarios.
* These definitions exist for the purposes of subclassing result validation.
* Only contains definition for 'ONE_WAY' scenario.
* Three other placeholder scenarios.

---

**./src/test-common/possible-route-results.js**
* New file - Used to check the valid results from 'possible routes' pathfinding.
* Only includes base validation for now.
* Scenario-specific checks will be implemented later.

---

**./test-cases/test-possible-routes-valid.js**
* New requirements:
	* ../src/common/enum-possible-route-tests (testScenarios)
	* ../src/test-common/possible-route-results (routeResults)
* Commented out function calls:
	* handleArguments
	* handleRouteCount
* Defined new test group "One-Way" (handleOneWay)
	* Only contains one test.
	* Runs pathfinding on example graph with only a 'ONE_WAY' criteria.
	* Base validation is implemented.
	* Sequence check will be implemented later.