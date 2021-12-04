# Changelog

**./src/test-common/possible-route-template.js**
* New file - Used to validate retrieved routes by their template.
* This is applied after base validation in 'possible-route-results.js'

---

**./test-parts/possible/valid/template-criteria.js**
* New file - Valid unit tests for template criteria.
* Not to be confused with the file in '../invalid'
* Only 'Exact' template at this stage.

---

**./test-parts/test-possible-routes.js**
* Added new requirement: './possible/valid/template-criteria'
* Added call to 'validTemplateCriteria'
* Commented out calls:
	* 'handleInvalidGroup' function.
	* All tests in 'handleValidGroup' except for 'validTemplateCriteria'