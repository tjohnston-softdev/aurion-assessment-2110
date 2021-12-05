# Changelog

**./src/common/enum/possible-route-tests.js**
* Defined 'TEMPLATE_CHAR_GRPS' scenario.

---

**./src/test-common/possible-route-templates.js**
* Wrote new function 'followCharacterGroups'
* Changes to 'checkResultObject'
	* Added support for 'TEMPLATE_CHAR_GRPS'
	* 'TEMPLATE_CHAR_GRPS' calls 'followCharacterGroups'

---

**./test-parts/possible/valid/template-criteria.js**
* Changed 'repeat' argument from True to False in tests:
	* "Choice"
	* "Invert"
* Added new "Character Groups" test.
	* Second step must be a possible start node. (A, B, C)
	* Fourth step must be a possible end node. (D, E, F)