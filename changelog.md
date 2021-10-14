# Changelog

**./submission.js**
* Uncommented `resArr.push` in 'callShortestRouteTestCases'
* Changes to 'callPossibleRouteByStopCountTestCases'
	* Removed console output.
	* Push output variables to 'resArr'
* Wrote new function 'callPossibleRouteByDistanceTestCase'
	* Runs test case #10
	* Called from 'runSubmission'
* Console output from case #10
	* Valid routes.
	* Number of valid routes.
* Result:
	* Number output is correct.
	* Chosen routes may be glitched.