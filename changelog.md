# Changelog

**./test-parts/possible/valid/template-criteria.js**
* Merged common test code into new function 'handlePathfinding'
	* Perform pathfinding.
	* Check base results.
	* Check routes against template.
	* Return number of routes.
* Changes to the "Exact" test:
	* Declared 'resultCount' variable.
	* 'resultCount' is assigned with 'handlePathfinding'
	* Replaced 'resultValue.length' reference with 'resultCount'