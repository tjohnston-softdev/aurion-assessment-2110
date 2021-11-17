# Changelog

**./cases.js**
* Modified 'possible routes' test cases to use new structure.
	* runTestCase6
	* runTestCase7
	* runTestCase10

---

**./src/possible-routes.js**
* Changes to 'routeCriteria.validateCriteria' call in 'findPossibleRoutes'
	* Added 'graphObject.nodes' argument.
* Changes to 'iterateRoutes' call in 'performInitialSequence'
	* Replaced 'prepData' argument with 'prepData.endNodes'