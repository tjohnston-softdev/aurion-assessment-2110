# Changelog

**./src/common/enum/possible-route-tests.js**
* Defined 'TEMPLATE_INVERT' scenario.

---

**./src/test-common/possible-route-templates.js**
* Wrote new function 'followInvert'
* Changes to 'checkResultObject'
	* Added support for the 'TEMPLATE_INVERT' scenario.
	* 'TEMPLATE_INVERT' calls 'followInvert'

---

**./test-parts/possible/valid/template-criteria.js**
* Wrote new "Invert" test.
	* The second node cannot be A or B.
	* The fourth node cannot be D or E.