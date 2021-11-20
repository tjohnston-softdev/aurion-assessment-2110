# Changelog

**./package.json**
* Removed 'test-pathfinding' script.
* Added new scripts:
	* test-exact
	* test-shortest
	* test-possible

---

**./test/index.js**
* Removed 'testPathfindingInput' requirement.
* Added new requirements from '../test-parts/'
	* test-exact-route
	* test-shortest-route
	* test-possible-routes
* Removed commented out `describe` block.
* Revised 'runUnitTests' to account for individual pathfinding test modes.

---

**./test-parts/test-pathfinding-input.js**
* This file is now empty.