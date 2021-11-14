# Changelog

**./src/test-common/graph-input.js**
* New file - Contains example graph for 'pathfinding' unit tests.
	* At first, this was parsed from a given string during runtime.
	* Now it is precompiled.

---

**./test-parts/test-pathfinding-input.js**
* Required '../src/test-common/graph-input'
* Removed the 'prepareExampleGraph' function.
* Wrote new function 'loadExampleGraph'
	* Reads object from 'graphInput'