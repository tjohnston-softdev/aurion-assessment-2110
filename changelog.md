# Changelog

**./src/test-common/possible-route-templates.js**
* Changes to 'followExact' and 'followWildcard'
	* Removed error throwing from loops.
	* 'matchSuccessful' is returned.
* Changes to 'checkResultObject'
	* Declared 'currentMatch' variable.
	* Declared 'canContinue' variable.
	* 'currentMatch' consumes result of 'followExact' and 'followWildcard'
	* Changed loop from `FOR` to `WHILE`
	* 'currentMatch' defaults to True on iteration.
	* Unsupported scenarios are ignored without error.
	* If 'currentMatch' is False, abort loop and throw error.
	* Because of this structure change, the error message is shared across all scenarios.