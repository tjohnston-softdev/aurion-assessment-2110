# Changelog

* Set hard edge distance limit of one billion (1000000000)
* Implemented unit testing modes:
	* Input
	* Parse
	* Exact
	* Shortest
	* Possible
	* Submission
* Route criteria types:
	* Start node(s)
	* End node(s)
	* Number of stops (Pre-existing)
	* Total distance (Pre-existing)
	* One-way (No backtracking)
	* Template pattern
* Route criteria can consider any number of start or end nodes.
* Route template patterns use Regular Expressions with two key differences:
	* `\s` and `\S` represent any start node.
	* `\e` and `\E` represent any end node.
* Custom error messages for invalid route criteria.
* Precompiled 'pathfinding' unit tests example graph.
* Moved unit test parse output JSON file to its own script.
* For 'possible routes' pathfinding, consider an Infinite number of routes, skipping loop if necessary.