# Changelog

**./src/common/possible-route-template.js**
* Added missing 'validationResult' argument to 'loopTemplates' call. (compileTemplateObjects)
* Added missing `return compileRes;` (compileRegularExpression)

---

**./test-parts/test-possible-routes.js**
* Wrote new function 'writeLongTemplateString'
	* Writes really long template string.
	* Designed to exceed character limit.
* New tests:
	* "Invalid Template - String Too Long"
	* "Invalid Template - String Type"
	* "Invalid Template - Empty String"
	* "Invalid Template - Regular Expression"