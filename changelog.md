# Changelog

**./src/common/graph-tasks.js**
* Wrote new function 'getUnknownNodesTextString'
	* Writes output string for when pathfinding node input is unknown.
	* Reusable across files.


---

**./src/possible-routes.js**
* Unknown nodes message is retrieved using 'graphTasks.getUnknownNodesText'

---

**./src/shortest-route.js**
* Unknown nodes message is retrieved using 'graphTasks.getUnknownNodesText'