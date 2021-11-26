# Changelog

**./test-parts/test-shortest-route.js - runTests**
* Split unit tests into groups.
	* handleCorrectOutput
		* "Correct Output - Open" as "Open"
		* "Correct Output - Closed" as "Closed"
	* handleIncorrectOutput
		* "Missing Graph"
		* [...]
		* "Impossible Route"
* Moved variables to 'handleIncorrectOutput'
	* noRouteMsg
	* invalidStartMsg
	* invalidEndMsg