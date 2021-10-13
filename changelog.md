# Changelog

**./src/common/dsktra-tasks.js**
* New functions:
	* resetNodeTable
	* getCurrentVisitingNode

---

**./src/shortest-route.js**
* Started writing new function 'loopPathfinding'
	* Used to perform the Dijkstra search algorithm itself.
	* Called from 'findShortestRoute' after 'dsktraTasks.setClosed'
	* Only reads current visiting node - in queue with shortest total distance.
	* Only iterates once.
	* Displays visiting node before and after reset.

---

**./src/submission.js**
* Uncommented 'runShortestRouteTestCases' call.
* Commented out following in 'runShortestRouteTestCases'
	* `var case9 ...`
	* `resArr.push`
* Commented out `console.log(caseResultArray);`