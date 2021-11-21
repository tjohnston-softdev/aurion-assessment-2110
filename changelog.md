# Changelog

**./src/possible-routes.js**
* Changes to 'iterateRoutes'
	* Declared 'seqOnly' parameter.
	* Declared 'canContinue' variable.
	* Updated `while` loop to use 'canContinue'
	* 'endReached' is only set if the complete route has at least 1 stop.
	* Loop will continue as long as 'endReached' and/or 'seqOnly' are False.
	* Replaced "update loop index." with "update loop variables." for commenting.
* Changes to 'performMainSearch'
	* Renamed 'useStepBack' variable to 'useBack'
* Added 'seqOnly' arguments to 'iterateRoutes' calls:
	* performInitialSequence = True
	* performMainSearch = False
* x