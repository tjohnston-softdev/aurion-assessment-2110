# Changelog

**./src/common/enum/possible-route-tests.js**
* New scenarios:
	* TEMPLATE_SEQ_ONCE
	* TEMPLATE_SEQ_REPEAT

---

**./src/test-common/possible-route-templates.js**
* Changes to 'followExact'
	* 'currentVisitID' is no longer checked before assigning 'currentVisitChar'
* Changes to 'followWildcard'
	* 'currentVisitID' is no longer checked before assigning 'currentVisitChar'
	* Removed `currentVisitChar !== null` checks from iteration result `IF` structure.
* Wrote new function 'followSequence'
	* Shared function for 'TEMPLATE_SEQ_ONCE' and 'TEMPLATE_SEQ_REPEAT' scenarios.
	* If 'useGlobal' is set, the sequence will be checked multiple times.
* Wrote new function 'updateSequenceProgression'
	* Used to update the sequence index number during 'followSequence'
	* If the nodes do not match, the index is reset without error.
* Changes to 'checkResultObject' loop:
	* Corrected from `FOR` to `WHILE`
	* Added missing increment.
	* Added support for 'TEMPLATE_SEQ_ONCE' and 'TEMPLATE_SEQ_REPEAT' scenarios.

---

**./test-parts/possible/valid/template-criteria.js**
* New tests:
	* "Sequence Once"
	* "Sequence Repeat"