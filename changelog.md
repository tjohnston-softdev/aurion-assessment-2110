# Changelog

**./src/parse-graph.js**
* Renamed variables in 'loopGraphParts'
	* 'currentLengthGiven' to 'currentLengthValid'
	* 'currentValid' to 'currentPrepared'
* checkDistanceValid
	* Capped 'distNum' at one billion (1000000000)

---

**./test-parts/parse-graph.js - handleIgnoreData**
* Added new test: "Distance Too Long"

---

**./test-parts/parse-output.json**
* Added new property: 'distanceTooLong'