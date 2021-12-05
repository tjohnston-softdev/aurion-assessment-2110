# Changelog

**./src/common/enum/possible-route-tests.js**
* Removed scenarios:
	* TEMPLATE_SEQ_ONCE
	* TEMPLATE_SEQ_REPEAT
* Added new scenarion 'TEMPLATE_SEQUENCE'

---

**./src/test-common/possible-route-templates.js**
* Changes to 'followSequence'
	* Removed the 'useGlobal' parameter.
	* 'seqString' is now a local variable with a hard-coded value.
	* Re-wrote the `WHILE` loop into a `FOR` loop.
	* Removed 'canStep' variable.
	* Removed manual 'stepIndex' increment.
* Changes to 'checkResultObject'
	* Removed 'TEMPLATE_SEQ_ONCE'
	* Removed 'TEMPLATE_SEQ_REPEAT'
	* Added 'TEMPLATE_SEQUENCE'

---

**./test-parts/possible/valid/template-criteria.js**
* Removed "Sequence Once" test.
* Renamed "Sequence Repeat" test to "Repeating Sequence"
* Replaced 'TEMPLATE_SEQ_REPEAT' with 'TEMPLATE_SEQUENCE'