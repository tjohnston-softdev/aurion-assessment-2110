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
	// Loop all retrieved routes.
	for (var loopIndex = 0; loopIndex < routeArr.length; loopIndex++)
	{
		// Read current route.
		var currentElement = routeArr[loopIndex];
		
		// Check schema, distance, and sequence.
		checkBaseSchema(currentElement);
		checkBaseDistance(currentElement.route.distance);
		checkBaseSequence(currentElement.route, graphObject);
		
		// Read stop count, start node, and end node.
		var currentStopCount = currentElement.route.steps.length - 1;
		var currentStart = currentElement.route.steps[0];
		var currentEnd = currentElement.route.steps[currentStopCount];
		
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
	
	var sequenceValid = true;
	var estimatedDistance = 0;
	
	// Loop route steps until traversed, or error found.
	while (stepIndex >= 0 && stepIndex <= stepCutoff && sequenceValid === true)
	{
		// Read current and next node.
		var currentNodeIndex = routeObj.steps[stepIndex];
		var currentOffsetIndex = routeObj.steps[stepIndex + 1];
		
		// Check if nodes exist.
		var currentNodeExists = checkNodeExists(currentNodeIndex, graphObj.nodes.length);
		var currentOffsetExists = checkNodeExists(currentOffsetIndex, graphObj.nodes.length);
		var currentDistance = -1;
		var currentMatch = false;
		
		
		if (currentNodeExists && currentOffsetExists)
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
		
		if (!currentMatch) sequenceValid = false;
		
		stepIndex = stepIndex + 1;
	}
	
	// Loop complete.
	if (sequenceValid)
	{
		// Check if expected distance matches actual.
		expect(routeObj.distance).to.equal(estimatedDistance);
	}
	else
	{
		throw new Error("Impossible route");
	}
}

// Checks if a given sequence is one-way, assuming it is valid.
function checkOneWaySequence(routeStepArray, startNode, endNode)
{	
	var stepIndex = 0;
	var skipNodesArray = [];
	var sequenceValid = true;
	
	
	// Loop route steps until traversed, or error found.
	while (stepIndex >= 0 && stepIndex < routeStepArray.length && sequenceValid)
	{
		// Read current node.
		var currentNode = routeStepArray[stepIndex];
		var currentSkip = skipNodesArray.includes(currentNode);
		var currentRepeat = searchNodeRepeat(routeStepArray, currentNode, stepIndex);
		var currentValid = false;
		
		if (currentSkip)
		{
			// Skip node.
			currentValid = true;
		}
		else if (currentRepeat && currentNode === startNode && currentNode === endNode)
		{
			// Start and End nodes are exempt.
			currentValid = true;
			skipNodesArray.push(currentNode);
		}
		else if (currentRepeat)
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
	var searchRes = -1;
	
	// Loop edges until found.
	while (edgeIndex >= 0 && edgeIndex < edgeArr.length && searchRes < 0)
	{
		var currentEdge = edgeArr[edgeIndex];
		
		if (currentEdge.origin === srcNode && currentEdge.destination === destNode)
		{
			// Match found.
			searchRes = currentEdge.distance;
		}
		
		edgeIndex += 1;
	}
	
	return searchRes;
}


// Checks if a given node repeats in a sequence.
function searchNodeRepeat(stepArr, tgtNode, sIndex)
{
	var matchFlag = stepArr.indexOf(tgtNode, sIndex + 1);
	return (matchFlag >= 0 && matchFlag > sIndex && matchFlag < stepArr.length)
}


// Checks if a given node ID exists.
function checkNodeExists(tgtIndex, nCount)
{
	return (tgtIndex >= 0 && tgtIndex < nCount);
}



module.exports =
{
	checkObject: checkResultObject
};