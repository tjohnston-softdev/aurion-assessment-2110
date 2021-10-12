# Changelog

**./src/parse-graph.js**
* New functions:
	* 'loopGraphParts' - Reads edges from input string.
	* 'castDistance' - Converts distance string into a number.
	* 'checkDistanceValid' - Checks whether a distance number is valid. (Positive whole)
* Declared new variable 'graphParts' in 'performInputParsing'	
	* 'prepContents' split by comma.
	* Array of different graph parts (eg. "AB3")
	* Assigned on valid syntax.
* Other changes to 'performInputParsing'
	* Call 'loopGraphParts' on valid syntax.
	* Return 'parseRes'
	* Called publicly as 'performParsing'

---

**./submission.js**
* Required './src/parse-graph'
* Declared 'parsedGraphObject' variable.
	* Starts as null.
	* Assigned with 'parseGraph.performParsing' after input file is read.
* Echo 'parsedGraphObject' to console regardless of result.