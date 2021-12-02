# Changelog

**./src/test-common/parse-help.js**
* New requirements:
	* mocha
	* chai
* Received functions from '../../test-parts/test-graph-parse.js'
	* 'checkParseResult' as 'checkParseResultObject'
	* 'checkGraphContents' as 'checkResultGraphContents'

---

**./test-parts/parse/**
* New folder - Test groups split from '../test-graph-parse.js'
	* 'valid-case.js' - Valid graph input.
	* 'ignore-cases.js' - Graph input that is ignored without error.
	* 'invalid-cases.js' - Graph input that causes error.

---

**./test-parts/test-graph-parse.js**
* Moved functions to 'parseHelp'
	* 'checkParseResult' as 'checkParseResultObject'
	* 'checkGraphContents' as 'checkResultGraphContents'
* Moved 'handleValidCase' to './parse/valid-case.js' as 'callValidTest'
* Moved 'handleIgnoreData' to './parse/ignore-cases.js' as 'callIgnoreDataTests'
* Moved the following to './parse/invalid-cases.js'
	* 'handleInvalidCases' function as 'callInvalidCaseTests'
	* 'callInvalidEntry' function.
	* 'formatErrorText' global.
	* 'arrayErrorText' global.
* Removed requirements:
	* fs
	* parseGraph
	* errorThrowing
	* parseHelp
	* parseOutputData
* Added new requirements:
	* ./parse/valid-case
	* ./parse/ignore-cases
	* ./parse/invalid-cases