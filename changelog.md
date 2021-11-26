# Changelog

**./src/common/possible-criteria-validation.js - loopCriteriaComplete**
* Removed parameters: 'givenDistance', 'givenStops'
* Declared new parameter 'givenRoute'
* Declared new variables: 'finalDistance', 'finalStops'
* Replaced 'givenStops' reference with 'finalStops'
* Replaced 'givenDistance' reference with 'finalDistance'

---

**./src/possible-routes.js**
* Changes to 'validateCompletedRoute'
	* Removed parameters: 'distVal', 'stopCount'
	* Declared new parameter 'compRoute'
	* Updated 'possibleCriteriaValidation' call to use correct arguments.
* Changes to 'iterateRoutes'
	* Updated 'validateCompletedRoute' call to use correct arguments.