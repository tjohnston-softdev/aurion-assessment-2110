# Changelog

**./src/common/error-messages.js - outputToConsole**
* Commented out `console.log`
* Error is thrown instead.

---

**./test-parts/test-input-functions.js**
* New file - Unit tests for '../src/input-file.js'
* Tests for:
	* readPathArg
	* getEntry

---

**./test/index.js**
* New requirement: '../test-parts/test-input-functions'
* Removed placeholder tests.
* Call 'testInputFunctions'