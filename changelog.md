# Changelog

**Changes from original submission**
* Implemented unit tests for:
	* Input file validation.
	* Graph parsing.
	* Pathfinding algorithms.
	* Submission example cases.
* Revised implementation details:
	* Removed stray horizontal rule under implementation details
	* Described output for different pathfinding functions.
	* Described project dependencies.
	* Various formatting changes throughout.
* Revised submission code.
	* Merged "NO SUCH ROUTE" text into common function.
	* Parsed graph must have multiple nodes/edges
	* Revised 'possible routes' algorithm to avoid impossible sequences
	* Split submission test cases to their own file.
* Dependencies.
	* The submission itself uses no third-party packages. Everything is written in native Node JS.
	* Unit tests were implemented using [mocha](https://mochajs.org/) and [chai](https://www.chaijs.com/)