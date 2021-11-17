# Changelog

**./src/test-common/graph-input.js**
* File now exports the graph itself instead of the definition function.

---

**./test-parts/test-pathfinding-input.js**
* Removed 'exampleGraph' global variable.
* Renamed 'graphInput' global to 'exampleGraphObject'
* Removed functions:
	* loadExampleGraph
	* disposeExampleGraph
* Replaced 'exampleGraph' references with 'exampleGraphObject'
* Commented out 'handlePossibleRoutes' call.