# Changelog

**./src/test-common/error-throwing.js**
* Declared global 'nullGraphMessageText'
	* Split from '../../test-parts/test-pathfinding-input.js
	* Stored in one place.
	* Accessible by multiple unit test files.

---

**./test-parts/test-pathfinding-input.js**
* New requirement: '../src/common/graph-tasks'
* Globals are now assigned using 'graphTasks'
	* unknownNodesMsg
	* noRouteMsg
* Moved 'graphErrMsg' global contents to 'errorThrowing' as 'nullGraphMessageText'
* Replaced references to 'graphErrMsg' with 'errorThrowing.nullGraphText'