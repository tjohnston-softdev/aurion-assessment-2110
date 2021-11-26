# Changelog

**./test-parts/test-possible-routes-valid.js**
* New file - Valid unit tests for 'possible routes' pathfinding.

---

**./test-parts/test-possible-routes-invalid.js**
* New file - Invalid unit tests for 'possible routes' pathfinding.

---

**./test-parts/test-possible-routes.js**
* Moved functions to '-invalid.js'
	* writeLongTemplateString
	* callPossibleRoutesMissingGraph
* Moved unit tests to '-valid.js' under "Count"
	* "Correct Output - Single" as "Single"
	* "Correct Output - Multiple" as "Multiple"
	* "Correct Output - Zero" -----> as "Zero"
	* "Infinite Routes" as "Infinite"
* Moved unit tests to '-invalid.js'
	* "Missing Graph" under "Arguments"
	* "Invalid Criteria Array" as "Criteria Array" under "Arguments"
	* "Invalid Criteria Object" as "Individual Criteria Object" under "Arguments"
	* "Unknown Criteria Type" under "Arguments"
	* "Empty Criteria" under "Arguments"
	* "Invalid Node - Value Type" as "Value Type" under "Nodes"
	* "Invalid Node - Empty" as "Empty" under "Nodes"
	* "Invalid Node - Unknown" as "Unknown" under "Nodes"
	* "Invalid Criteria - Zero Number" as "Zero" under "Stop Count and Total Distance"
	* "Invalid Criteria - Negative Number" as "Negative" under "Stop Count and Total Distance"
	* "Invalid Criteria - Unknown Sign" as "Unknown Sign" under "Stop Count and Total Distance"
	* "Invalid Criteria - Number Type" as "Number Type" under "Stop Count and Total Distance"
	* "Invalid Template - String Too Long" as "String Too Long" under "Template"
	* "Invalid Template - String Type" as "String Type" under "Template"
	* "Invalid Template - Empty String" as "Empty String" under "Template"
	* "Invalid Template - Regular Expression" as "Regular Expression Parse" under "Template"
	* "Impossible Route" under "Arguments"
* 'runTests' only contains a placeholder.
* Removed "Main Function" comment.
* Removed `module.exports`

---

**./package.json**
* Removed 'test-possible' script.
* Defined new scripts:
	* test-possible-valid
	* test-possible-invalid

---

**./test/index.js**
* Removed 'testPossibleRoutes' requirement.
* New requirements:
	* ../test-parts/test-possible-routes-valid
	* ../test-parts/test-possible-routes-invalid
* Removed 'possible' test mode.
* New test modes:
	* possible-valid
	* possible-invalid