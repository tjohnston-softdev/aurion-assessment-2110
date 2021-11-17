# Changelog

**./src/common/enum/criteria-types.js**
* Added two new options:
	* START_NODE
	* END_NODE

---

**./src/common/route-criteria.js**
* Wrote new function 'setTargetNode'
	* Creates 'START_NODE' and 'END_NODE' criteria objects.
* Wrote constructors:
	* defineStartNodeCriteria
	* defineEndNodeCriteria
* Declared parameters:
	* givenNodesList (validateRouteCriteria)
	* givenNodes (iterateCriteriaValidation)
	* nodeListObject (readCriteria)
* Wrote new function 'handleTargetNode'
	* Validates properties for 'START_NODE' and 'END_NODE' criteria objects.
* Modified 'readCriteria' to call 'handleTargetNode' for relevant criteria.

---

**./src/common/possible-route-tasks.js**
* Added requirement: './enum/criteria-types'
* Removed functions:
	* parseStartEndNodes
	* validateNodeInput
	* readStartNode
	* readEndNode
	* initializeRouteBacklog
* Wrote new functions to find start and end nodes based on criteria.
	* 'setRouteTargetNodes', Main function.
	* 'loopTargetCriteria', Criteria loop.
	* 'addNodeToTarget', Add node to target array.

---

**./src/possible-routes.js - findPossibleRoutes**
* Removed variables:
	* preparedNodes
	* startNodeValid
	* endNodeValid
* 'criteriaValidation' is declared and assigned on the same line.
* Declared 'targetNodesObject' variable.
* Revised `IF` structure to remove node input validation. This is handled by criteria now.
* Replaced references to 'preparedNodes' with 'targetNodesObject'
* Commented out calls:
	* performInitialSequence
	* performMainSearch