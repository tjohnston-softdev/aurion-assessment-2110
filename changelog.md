# Changelog

**./test-parts/test-possible-routes.js - runTests**
* "Correct Output - Single"
	* Renamed 'routeStops' to 'routeStopCount'
	* Declared 'routeStart' - Criteria object for start node.
	* Declared 'routeEnd' - Criteria object for end node.
	* Added 'routeStart' and 'routeEnd' to 'searchCriteria'
	* Removed arguments `"A", "C"` from 'possibleRoutes.findRoutes' call.
* "Correct Output - Multiple"
	* Renamed 'routeStops' to 'routeStopCount'
	* Declared 'routeStart' - Criteria object for start node.
	* Declared 'routeEnd' - Criteria object for end node.
	* Added 'routeStart' and 'routeEnd' to 'searchCriteria'
	* Removed arguments `"A", "F"` from 'possibleRoutes.findRoutes' call.
* "Correct Output - Zero"
	* Declared 'routeStart' - Criteria object for start node.
	* Declared 'routeEnd' - Criteria object for end node.
	* Added 'routeStart' and 'routeEnd' to 'searchCriteria'
	* Removed arguments `"A", "F"` from 'possibleRoutes.findRoutes' call.
* "Missing Node Argument", "Empty Node Argument", "Unknown Node"
	* Commented out.
	* Will be re-implemented later.
* "Invalid Criteria Array", "Invalid Criteria Object"
	* Removed arguments `"A", "B"` from 'possibleRoutes.findRoutes' call.
* "Unknown Criteria Type"
	* Declared 'routeStart' - Criteria object for start node.
	* Declared 'routeEnd' - Criteria object for end node.
	* Added 'routeStart' and 'routeEnd' to 'searchCriteria'
	* Removed arguments `"A", "B"` from 'possibleRoutes.findRoutes' call.
* "Invalid 'Stop Count' / 'Total Distance' - Not Positive"
	* Renamed 'routeStops' to 'routeStopCount'
	* Declared 'routeStart' - Criteria object for start node.
	* Declared 'routeEnd' - Criteria object for end node.
	* Added 'routeStart' and 'routeEnd' to 'searchCriteria'
	* Removed arguments `"A", "B"` from 'possibleRoutes.findRoutes' call.
* "Invalid 'Stop Count' / 'Total Distance' - Unknown Sign"
	* Declared 'routeStart' - Criteria object for start node.
	* Declared 'routeEnd' - Criteria object for end node.
	* Added 'routeStart' and 'routeEnd' to 'searchCriteria'
	* Removed arguments `"A", "B"` from 'possibleRoutes.findRoutes' call.
* "Invalid 'Stop Count' / 'Total Distance' - Number Type"
	* Declared 'routeStart' - Criteria object for start node.
	* Declared 'routeEnd' - Criteria object for end node.
	* Added 'routeStart' and 'routeEnd' to 'searchCriteria'
	* Removed arguments `"A", "B"` from 'possibleRoutes.findRoutes' call.
* "Impossible Route"
	* Declared 'routeStart' - Criteria object for start node.
	* Declared 'routeEnd' - Criteria object for end node.
	* Declared 'routeStopCount' - Criteria object limiting number of stops.
	* If not for 'routeStopCount', there would be technically an infinite number of routes.
	* Declared 'searchCriteria' array.
	* Replaced 'emptyCriteria' reference with 'searchCriteria'
	* Removed arguments `"A", "G"` from 'possibleRoutes.findRoutes' call.