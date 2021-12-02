# Changelog

**./test-parts/shortest/**
* New folder - Test groups split from '../test-shortest-route.js'
	* correct-cases.js
	* invalid-cases.js

---

**./test-parts/test-shortest-route.js**
* Moved 'handleCorrectOutput' to './shortest/correct-cases.js' as 'callCorrectTestCases'
* Moved functions to './shortest/invalid-cases.js'
	* 'handleIncorrectOutput' as 'callInvalidTestCases'
	* 'callShortestRouteMissingGraph' as 'callMissingGraph'
* Removed requirements:
	* shortestRoute
	* graphTasks
	* errorThrowing
	* nullGraph
	* pathfindingHelp
	* exampleGraphObject
* Added requirements:
	* ./shortest/correct-cases
	* ./shortest/invalid-cases