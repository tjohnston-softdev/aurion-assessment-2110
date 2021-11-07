# Changelog

**./instructions.md - Changes to implementation details**
* Changed input type.
	* "via plain text file" --> "a plain text file"
	* "as above." --> "as explained above."
* Changed input file content error.
	* Before: "Otherwise, there will be an error."
	* After: "Otherwise, errors will be raised during parsing."
* Capitalized `KB` file size unit.
* Re-worded `fs` error handling.
	* Before: "Error handling [...] file."
	* "Error handling [...] input file access functions."
* 'Format error' point is now nested.
* Re-worded 'multiple nodes and edges error'
	* "formatting errors." --> "errors."
	* Sub-point explains error coverage.
* Clarified that edges past the hard limit are ignored without error.
* Split the "Numbers that cannot be interpreted [...]" point.
* Fixed syntax for the "Negative and decimal values [...]" point.
	* "initial format" --> "the initial format"
	* "characters" --> "respective characters"
* Re-worded 'exact routes invalid messages'
	* Before: "invalid input."
	* After: "invalid route input."
* Re-worded 'completed route'
	* Before: "[...] be saved."
	* After: "[...] be remembered."
* Added new points under 'Possible Routes"
	* "Valid routes are counted [...]"
	* "Backtracking is allowed [...]"
* Re-worded 'unit testing excessive' point.
	* Before: "[...] a little excessive."
	* After: "[...] would have been excessive [...] only had three days [...]"
* Capitalized unit testing library names.
* Re-worded 'unit testing implemented' point.
	* Before: "Unit testing was [...] update"
	* After: "Proper unit tests were [...] in my own time"
* Other changes:
	* "one-way" --> "direct"
	* "Expands [...]" --> "Pathfinding expands [...]"
	* "going around in circles" --> "searching forever"
	* "Letters will be interpreted" --> "Letters are interpreted"