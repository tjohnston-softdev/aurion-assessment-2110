# Changelog

**./src/parse-graph.js**
* Wrote new function 'checkEdgeExists'
	* Checks if a given edge already exists.
	* Edges are only one-way.
	* Origin and destination must be exact. Vice-versa does not count.
* Renamed 'loopGraphParts' variables:
	* 'currentOrigin' to 'currentOriginChar'
	* 'currentDest' to 'currentDestChar'
* Declared new variables in 'loopGraphParts'
	* currentOriginID
	* currentDestID
	* currentExists
* 'loopGraphParts' structure:
	* On `currentLengthGiven === true`, assign ID variables and check if edge exists.
	* On `currentValid === true && currentExists !== true`, add new edge to graph.