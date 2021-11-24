# Changelog

**./src/shortest-route.js**
* Wrote separate output messages for invalid start/end node input.
* Removed "Unknown nodes." comment.

---

**./src/common/graph-tasks.js**
* Removed the 'getUnknownNodesTextString' function.

---

**./test-parts/test-possible-routes.js**
* Removed 'graphTasks' requirement.
* Removed 'unknownNodesMsg' variable from 'runTests'

---

**./test-parts/test-shortest-route.js - runTests**
* Removed 'unknownNodesMsg' variable.
* Changes to "Unknown Node" test
	* Renamed to "Unknown End Node"
	* Checks for new error message.
* Wrote new test: "Unknown Start Node"
* x