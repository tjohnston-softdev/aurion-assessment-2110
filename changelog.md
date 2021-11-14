# Changelog

**./test-parts/test-pathfinding-input.js - handlePossibleRoutes**
* Removed commented out unit tests:
	* "Invalid Distance Criteria"
	* "Invalid Stop Count Criteria"
* Uncommented the "Impossible Route" test.
	* Removed extra 'emptyCriteria' argument.
* Changed example value for "Invalid 'Stop Count' / 'Total Distance' - Not Positive"
	* Before: -50
	* After: -10