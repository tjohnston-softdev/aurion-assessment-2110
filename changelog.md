# Changelog

**./src/common/route-criteria.js - handleNumberSign**
* Modified reason for invalid number type.
	* Before: "must be a valid, whole number."
	* After: "must be whole."

---

**./test-parts/test-pathfinding-input.js**
* Removed 'badCriteriaMsg' global.
* Added new unit tests to 'handlePossibleRoutes'
	* "Unknown Criteria Type"
	* "Invalid 'Stop Count' / 'Total Distance' - Not Positive"
	* "Invalid 'Stop Count' / 'Total Distance' - Unknown Sign"
	* "Invalid 'Stop Count' / 'Total Distance' - Number Type"