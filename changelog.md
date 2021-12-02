# Changelog

**./test-parts/possible/**
* New folder - Top level for 'possible routes' unit testing groups.
* Subfolders:
	* valid
	* invalid

---

**./test-parts/possible/valid/**
* New folder - 'Valid' unit testing groups for 'possible routes'
* Split from '../../test-possible-routes-valid.js'
	* one-way.js
	* start-end.js

---

**./test-parts/possible/invalid/**
* New folder - 'Invalid' unit testing groups for 'possible routes'
* Split from '../../test-possible-routes-invalid.js'
	* search-args.js
	* node-criteria.js
	* stop-dist-criteria.js
	* template-criteria.js

---

**./test-parts/backup**
* New file - Unused 'PR-VALID' tests.

---

**./test-parts/possible-routes-invalid.js**
* Moved functions to './possible/invalid/search-args.js'
	* 'handleArguments' as 'callArgumentTests'
	* 'callPossibleRoutesMissingGraph' as 'callMissingGraph'
* Moved 'handleNodes' to './possible/invalid/node-criteria.js' as 'callNodeCriteriaTests'
* Moved 'handleStopDist' to './possible/invalid/stop-dist-criteria.js' as 'callStopDistTests'
* Moved functions to './possible/invalid/template-criteria.js'
	* 'handleTemplate' as 'callTemplateCriteriaTests'
	* 'writeLongTemplateString' as 'writeLongString'
* Removed "Main function" comment.
* Removed all requirements except for:
	* mocha
	* chai
* Removed `module.exports`
* This file is only a placeholder.

---

**./test-parts/possible-routes-valid.js**
* Moved 'handleOneWay' function to './possible/valid/one-way.js' as 'callOneWayTest'
* Moved 'handleStartEndNodes' function to './possible/valid/start-end.js' as 'callStartEndNodeTests'
* Moved functions to 'backup' file
	* handleArguments
	* handleRouteCount
* Removed "Main function" comment.
* Removed all requirements except for:
	* mocha
	* chai
* Removed `module.exports`
* This file is only a placeholder.

---

**./package.json - Scripts**
* Removed `test-possible-valid`
* Removed `test-possible-invalid`
* Added `test-possible`

---

**./test/index.js**
* Removed 'testPossibleRoutesValid' requirement.
* Removed 'testPossibleRoutesInvalid' requirement.
* Added new requirement: '../test-parts/test-possible-routes'
* Removed `--possible-valid` mode.
* Removed `--possible-invalid` mode.
* Added `--possible` mode, which calls 'testPossibleRoutes'