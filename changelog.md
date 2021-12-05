# Changelog

**./test-parts/possible/valid/other-cases.js**
* New file - Remaining unit tests.
	* Empty Criteria
	* Impossible Route
* Adapted from '../../backup'

---

**./test-parts/backup**
* Moved 'handleArguments' to './possible/valid/other-cases.js' as 'callOtherTestCases'
* This file is now empty.

---

**./test-parts/test-possible-routes.js**
* Added requirement for './possible/valid/other-cases' (validOther)
* Added call to 'validOther'
* Commented out call to 'validRouteCount'