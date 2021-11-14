# Changelog

**./src/common/route-criteria.js - validateRouteCriteria**
* Changed 'invalid array' reason.
	* Before "Criteria [...] array."
	* After: "Input [...] array."

---

**./src/test-common/pathfinding-help.js**
* Wrote new functions:
	* checkInvalidCriteriaMessageText
	* readCriteriaMessage
	* flagIncorrectCriteriaMessage

---

**./test-parts/test-pathfinding-input.js - handlePossibleRoutes**
* Modified existing unit tests to use 'pathfindingHelp' for message checking.
	* "Invalid Criteria Array"
	* "Invalid Criteria Object"