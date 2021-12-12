# Changelog

**./instructions.md - Possible Routes**
* Added blank line under heading.
* Added sub-points for supported criteria.
* Added "Any number of criteria can be used [...]"
* Removed "If the start or end nodes are missing, output message."
* Re-worded 'invalid criteria'
	* Before: "If the criteria objects are invalid"
	* After: "If any of the given criteria is invalid"
* Added "A route must meet [...] valid."
* Re-worded 'reach' point.
	* Before: "If the end node cannot be reached from the start node"
	* After: "If any of the end nodes cannot be reached from any of the start nodes"
* Split sub-points for what happens when the end node(s) cannot be reached.
* Re-worded 'start node' for 'pathfinding expands'
	* Before: "the start node"
	* After: "the possible start nodes"
* Clarified 'Backtracking'
	* "Backtracking is allowed" ---> "Backtracking is enabled by default"
	* Added sub-point to disable backtracking.
* Re-worded 'end node visit'
	* Before: "If the end node is visited"
	* After: "If any of the end nodes are visited"
* Re-worded 'route complete'
	* Before: "it is a completed route and will be remembered."
	* After: "it is a completed route and will be processed accordingly"
* "A complete route is valid [...]" is now a sub-point under 'route complete'
* Added extra sub-point to 'route complete'
	* "Invalid routes are temporarily stored to avoid repetition."
* Removed points:
	* "All completed routes are saved [...] end result."
	* "Valid routes are counted after all of the completed routes have been found."
* Changed 'successful output'
	* Before: "number of possible routes found, even if it is zero."
	* After: "array of all valid routes found, even if it is empty."
* Added 'infinity output' point.
	* "If the given route criteria does not restrict the route size"
* Added sub-point to 'infinity output', giving an example of what causes infinite output.
* Added "If there are no possible start nodes, output an empty array."

---

**./instructions.md - Other**
* Changed "distance" to "total distance" under headings:
	* Pathfinding - Exact Route
	* Pathfinding - Shortest Route
* Changes to 'Dependencies'
	* Removed "[...] formal unit tests were not included in the original submission."
	* Added "Unit tests are run completely separate [...] submission."
* Removed "The unit tests directly compare [...]" under 'Output'