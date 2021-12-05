# Changelog

**./src/common/enum/possible-route-tests.js**
* Defined 'TEMPLATE_NEST' scenario.

---

**./src/test-common/possible-route-templates.js**
* Wrote new function 'followNesting'
* Changes to 'checkResultObject'
	* Supported 'TEMPLATE_NEST' scenario.
	* 'TEMPLATE_NEST' calls 'followNesting'

---

**./test-parts/possible/valid/template-criteria.js**
* Defined new "Nested Loop" test.
	* First step can be anything.
	* Route goes back and forth between A and C from second step onwards.