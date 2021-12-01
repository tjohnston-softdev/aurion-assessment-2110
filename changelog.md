# Changelog

**./test-parts/test-possible-routes-valid.js**
* "End Node" - "Multiple"
	* Copied test code to '../cases.js'

---

**./cases.js**
* Debugging 'multiple end nodes' for 'possible routes' pathfinding.

---

**./src/common/possible-route-tasks.js - checkDeriveAllowed**
* Renamed 'endStatus' variable to 'endMatch'
* Declared 'endFound' variable.
* 'endFound' is True on at least one of the following:
	* 'endMatch' is true
	* 'eNodes' is empty.
* Appended `endFound === true` onto `visitStatus === true && startEnd === true`