# Changelog

**./src/test-common/possible-route-template.js**
* Restored original function parameter names: 'pathResObj' and 'nodeListObj'

---

**./src/test-common/possible-route-results.js**
* Re-wrote 'searchRes' variable for readability. (searchNodeRepeat)
* Wrote new function 'checkNodeExists' - Checks if a given node index is valid.
* Variables in 'checkBaseSequence' are now assigned using 'checkNodeExists'
	* currentNodeExists
	* currentOffsetExists