# Changelog

**./src/common/route-criteria.js**
* validateRouteCriteria
	* Split 'givenObject' type checking into a new function: 'checkValueType'
	* 'valueType' variable has been moved to 'checkValueType'
	* 'typeFlag' variable consumes 'checkValueType'
	* Re-wrote IF structure to accomodate criteria typing.
* 'checkValueType' returns a flag value.
	* Positive = Object
	* Zero = Any non-null type.
	* Negative = Null
* Re-wrote 'handleNumberSign' header comment.