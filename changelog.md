# Changelog

**./src/common/graph-tasks.js - getExistingEdge**
* Replaced `edgeRes !== null` with `edgeRes === null`

---

**./src/exact-route.js**
* New file - Follows the exact route on a graph.
* If route exists, output distance.
* Messages are output when:
	* Route does not exist.
	* Path array has only one node.
	* Path argument type is invalid.

---

**./submission.js**
* Required: './src/exact-route'
* Wrote new function 'runExactRouteTestCases'
* Changes to 'runSubmission'
	* Declared 'caseResultArray' variable.
	* On parse graph successful, call 'runExactRouteTestCases' and display results.