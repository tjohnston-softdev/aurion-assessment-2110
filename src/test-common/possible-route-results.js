// Checks 'possible route' pathfinding results.

const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const testScenarios = require("../common/enum/possible-route-tests");

// Main function.
function checkResultObject(pathResObj, inputGraphObj, scenarioFlag, inputParasObj)
{
	expect(pathResObj).to.be.an("array").that.is.not.empty;
	loopRoutes(pathResObj, inputGraphObj, scenarioFlag, inputParasObj);
}


// Test individual routes.
function loopRoutes(routeArr, graphObject, sceFlag, parasObj)
{
	var loopIndex = 0;
	var currentElement = null;
	
	var currentStopCount = -1;
	var currentStart = -1;
	var currentEnd = -1;
	
	// Loop all retrieved routes.
	for (loopIndex = 0; loopIndex < routeArr.length; loopIndex = loopIndex + 1)
	{
		// Read current route.
		currentElement = routeArr[loopIndex];
		currentStopCount = -1;
		currentStart = -1;
		currentEnd = -1;
		
		// Check schema, distance, and sequence.
		checkBaseSchema(currentElement);
		checkBaseDistance(currentElement.route.distance);
		checkBaseSequence(currentElement.route, graphObject);
		
		// Read stop count, start node, and end node.
		currentStopCount = currentElement.route.steps.length - 1;
		currentStart = currentElement.route.steps[0];
		currentEnd = currentElement.route.steps[currentStopCount];
		
		// Test by scenario.
		if (sceFlag === testScenarios.ONE_WAY)
		{
			// One way
			checkOneWaySequence(currentElement.route.steps, currentStart, currentEnd);
		}
		else if (sceFlag === testScenarios.START_END)
		{
			// Start and End nodes
			expect(parasObj.start).to.include(currentStart);
			expect(parasObj.end).to.include(currentEnd);
		}
		else if (sceFlag === testScenarios.STOPS_MIN)
		{
			// Minimum stops
			expect(currentStopCount).to.be.at.least(parasObj.numberValue);
		}
		else if (sceFlag === testScenarios.STOPS_MAX)
		{
			// Maximum stops
			expect(currentStopCount).to.be.at.most(parasObj.numberValue);
		}
		else if (sceFlag === testScenarios.STOPS_EXACT)
		{
			// Exact number of stops
			expect(currentStopCount).to.equal(parasObj.numberValue);
		}
		else if (sceFlag === testScenarios.STOPS_BETWEEN)
		{
			// Stop count range
			expect(currentStopCount).to.be.within(parasObj.min, parasObj.max);
		}
		else if (sceFlag === testScenarios.DIST_MIN)
		{
			// Minimum distance
			expect(currentElement.route.distance).to.be.at.least(parasObj.numberValue);
		}
		else if (sceFlag === testScenarios.DIST_MAX)
		{
			// Maximum distance
			expect(currentElement.route.distance).to.be.at.most(parasObj.numberValue);
		}
		else if (sceFlag === testScenarios.DIST_EXACT)
		{
			// Exact distance
			expect(currentElement.route.distance).to.equal(parasObj.numberValue);
		}
		else if (sceFlag === testScenarios.DIST_BETWEEN)
		{
			// Distance range
			expect(currentElement.route.distance).to.be.within(parasObj.min, parasObj.max);
		}
		
	}
}


// Validate route schema.
function checkBaseSchema(entryObject)
{	
	expect(entryObject).to.exist;
	expect(entryObject).to.be.an("object");
	
	expect(entryObject).to.have.property("route");
	expect(entryObject).to.have.property("valid");
	
	expect(entryObject.route).to.exist;
	expect(entryObject.route).to.be.an("object");
	
	expect(entryObject.valid).to.be.true;
	
	expect(entryObject.route).to.have.property("steps");
	expect(entryObject.route).to.have.property("distance");
	
	expect(entryObject.route.steps).to.be.an("array");
	expect(entryObject.route.steps.length).to.be.at.least(2);
}


// Check distance number.
function checkBaseDistance(distVal)
{
	var correctType = Number.isInteger(distVal);
	
	expect(correctType, "Distance must be a valid, whole number.").to.be.true;
	expect(distVal).to.be.above(0);
}


// Check if route node sequence is valid.
function checkBaseSequence(routeObj, graphObj)
{
	var stepIndex = 0;
	var stepCutoff = routeObj.steps.length - 2;
	
	var currentNodeIndex = -1;
	var currentOffsetIndex = -1;
	var currentNodeExists = false;
	var currentOffsetExists = false;
	var currentDistance = -1;
	var currentMatch = false;
	
	var sequenceValid = true;
	var estimatedDistance = 0;
	
	// Loop route steps until traversed, or error found.
	while (stepIndex >= 0 && stepIndex <= stepCutoff && sequenceValid === true)
	{
		// Read current and next node.
		currentNodeIndex = routeObj.steps[stepIndex];
		currentOffsetIndex = routeObj.steps[stepIndex + 1];
		
		// Check if nodes exist.
		currentNodeExists = checkNodeExists(currentNodeIndex, graphObj.nodes.length);
		currentOffsetExists = checkNodeExists(currentOffsetIndex, graphObj.nodes.length);
		currentDistance = -1;
		currentMatch = false;
		
		
		if (currentNodeExists === true && currentOffsetExists === true)
		{
			// Retrieve distance from current node to text.
			currentDistance = searchEdge(graphObj.edges, currentNodeIndex, currentOffsetIndex);
		}
		
		if (currentDistance > 0)
		{
			// Edge is valid - Append distance.
			estimatedDistance += currentDistance;
			currentMatch = true;
		}
		
		if (currentMatch !== true)
		{
			// Invalid edge.
			sequenceValid = false;
		}
		
		stepIndex = stepIndex + 1;
	}
	
	// Loop complete.
	if (sequenceValid === true)
	{
		// Check if expected distance matches actual.
		expect(routeObj.distance).to.equal(estimatedDistance);
	}
	else
	{
		// Invalid
		throw new Error("Impossible route");
	}
}

// Checks if a given sequence is one-way, assuming it is valid.
function checkOneWaySequence(routeStepArray, startNode, endNode)
{	
	var stepIndex = 0;
	var currentNode = -1;
	var currentSkip = false;
	var currentRepeat = false;
	var currentValid = false;
	
	var skipNodesArray = [];
	var sequenceValid = true;
	
	
	// Loop route steps until traversed, or error found.
	while (stepIndex >= 0 && stepIndex < routeStepArray.length && sequenceValid === true)
	{
		// Read current node.
		currentNode = routeStepArray[stepIndex];
		currentSkip = skipNodesArray.includes(currentNode);
		currentRepeat = searchNodeRepeat(routeStepArray, currentNode, stepIndex);
		currentValid = false;
		
		if (currentSkip === true)
		{
			// Skip node.
			currentValid = true;
		}
		else if (currentRepeat === true && currentNode === startNode && currentNode === endNode)
		{
			// Start and End nodes are exempt.
			currentValid = true;
			skipNodesArray.push(currentNode);
		}
		else if (currentRepeat === true)
		{
			// Backtracking
			sequenceValid = false;
			throw new Error("Route is not one-way");
		}
		else
		{
			// Valid
			currentValid = true;
			skipNodesArray.push(currentNode);
		}
		
		stepIndex = stepIndex + 1;
	}
	
}

// Checks if a given edge exists and returns the distance.
function searchEdge(edgeArr, srcNode, destNode)
{
	var edgeIndex = 0;
	var currentEdge = {};
	var searchRes = -1;
	
	// Loop edges until found.
	while (edgeIndex >= 0 && edgeIndex < edgeArr.length && searchRes < 0)
	{
		currentEdge = edgeArr[edgeIndex];
		
		if (currentEdge.origin === srcNode && currentEdge.destination === destNode)
		{
			// Match found.
			searchRes = currentEdge.distance;
		}
		
		edgeIndex = edgeIndex + 1;
	}
	
	return searchRes;
}


// Checks if a given node repeats in a sequence.
function searchNodeRepeat(stepArr, tgtNode, sIndex)
{
	var matchFlag = -1;
	var searchRes = false;
	
	// Future appearances.
	matchFlag = stepArr.indexOf(tgtNode, sIndex + 1);
	
	
	if (matchFlag >= 0 && matchFlag > sIndex && matchFlag < stepArr.length)
	{
		// Duplicate found.
		searchRes = true;
	}
	
	return searchRes;
}


// Checks if a given node ID exists.
function checkNodeExists(tgtIndex, nCount)
{
	var checkRes = (tgtIndex >= 0 && tgtIndex < nCount);
	return checkRes;
}



module.exports =
{
	checkObject: checkResultObject
};