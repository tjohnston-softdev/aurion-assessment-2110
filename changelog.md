# Changelog

**./src/parse-graph.js**
* Wrote new function 'validateGraphParse'
	* Checks whether the parsed graph has multiple nodes and edges.
	* Called from 'performInputParsing'
* Replaced `parseRes.valid = true;` with call to 'validateGraphParse'

---

**./src/common/error-messages.js**
* Wrote new function 'displayInvalidGraphErrorText'