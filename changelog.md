# Changelog

**./src/common/enum/possible-route-tests.js**
* Defined 'TEMPLATE_CHOICE' scenario.

---

**./src/test-common/possible-route-templates.js**
* Wrote new function 'followChoice'
* Changes to 'loopRoutes'
	* Added support for the 'TEMPLATE_CHOICE' scenario.
	* 'TEMPLATE_CHOICE' calls 'followChoice'

---

**./test-parts/possible/valid/template-criteria.js**
* Wrote new "Choice" test. The third node must be A, B, or C.