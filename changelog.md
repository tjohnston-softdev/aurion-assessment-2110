# Changelog

**./src/test-common/file-size.js**
* New file - Checks 'input file size' for corresponding unit test.
* Split from '../../test-parts/test-input-functions.js'
* Changes to function:
	* 'checkRes' is assigned in-line.
	* Error is thrown if 'checkRes' is not true.

---

**./src/test-common/error-throwing.js**
* New file - Checks `try-catch` result.
* Split from '../../test-parts/test-input-functions.js'
* Changes to 'checkTryCatchResult'
	* Declared 'checkRes' variable.
	* Replaced `expect(true).to.be.true;` with `checkRes = true;`
* Changes to 'flagIncorrectCatchError'
	* Removed "file system" from message.
	* "ended with" --> "been"

---

**./src/test-common/parse-help.js**
* New file - Functions for 'parse graph' unit tests.
* Split from '../../test-parts/test-graph-parse.js'
* Split functions are unchanged.

---

**./src/test-common/pathfinding-help.js**
* New file - Functions for 'pathfinding input' unit tests.
* Split from '../../test-parts/test-pathfinding-input.js'
* Changes to both functions:
	* Declared 'checkRes' variable.
	* Replaced `expect(true).to.be.true;` with `checkRes = true;`

---

**./test-parts/test-input-functions.js**
* Added requirements for:
	* ../src/test-common/file-size
	* ../src/test-common/error-throwing
* Split 'checkFileSize' to 'fileSize' as 'checkBytesNumber'
* Split functions to 'errorThrowing'
	* 'checkTryCatch' as 'checkTryCatchResult'
	* flagIncorrectError

---

**./test-parts/test-graph-parse.js**
* Added requirements for:
	* ../src/test-common/error-throwing
	* ../src/test-common/parse-help
* Split to 'parseHelp'
	* 'getNodeList' as 'getNodeListObject'
	* 'defineAlphabetGraph' as 'defineAlphabetGraphString'
	* 'defineMaxEdgesGraph' as 'defineMaxEdgesGraphString'
	* 'maxEdges' as 'maxEdgesNum'
	* 'alphabet' as 'alphabetString'
* Removed the 'flagIncorrectError' function.
* Modified 'callInvalidEntry' to use 'errorThrowing'

---

**./test-parts/test-pathfinding-input.js**
* Added requirements for:
	* ../src/test-common/error-throwing
	* ../src/test-common/pathfinding-help
* Removed functions:
	* checkMissingGraphError
	* flagIncorrectError
* Modified functions to use 'errorThrowing'
	* callExactRouteMissingGraph
	* callShortestRouteMissingGraph
	* callPossibleRoutesMissingGraph
* Split to 'pathfindingHelp'
	* checkOutputDistanceNumber
	* 'checkMultiplePossibleRoutes' as 'checkMultiplePossibleRoutesResult'