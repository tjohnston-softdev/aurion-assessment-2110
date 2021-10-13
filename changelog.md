# Changelog

**./src/shortest-route.js**
* Changes to 'defineDijkstraTable'
	* Split loop code into its own function 'setNodeTable'
	* This function only creates the result object.
	* Removed all parameters.
	* Removed all variables except for 'defineRes'
* Wrote new function 'setClosedRoute'
	* If the start and end nodes are the same, the route is considered to be closed.
	* This will affect if the start node can be revisited during pathfinding.
* Changes to 'findShortestRoute'
	* Removed 'nodeTable' variable.
	* Declared 'dijkstraInfoObject' variable, assigned with 'defineDijkstraTable'
	* Added call to 'setNodeTable'
	* Checks whether start and end nodes were successfully defined. If so, call 'setClosedRoute'
	* Added placeholder for missing start,end nodes.