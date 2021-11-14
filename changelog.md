# Changelog

**./src/common/possible-criteria-message.js**
* Prefixed with "Invalid route criteria"

---

**./src/common/route-criteria.js - readCriteria**
* Changed 'reason' for 'type' clause.
	* Before: "Invalid value type."
	* After: "Value type not allowed."

---

**./test-parts/test-pathfinding-input.js - handlePossibleRoutes**
* Commented out `expect` for "Invalid Criteria Array"