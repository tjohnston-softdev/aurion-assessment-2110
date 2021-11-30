const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const testScenarios = require("../common/enum/possible-route-tests");


function checkResultObject(pathResObj, inputGraphObj, scenarioFlag)
{
	expect(pathResObj).to.be.an("array").that.is.not.empty;
	loopRoutes(pathResObj, inputGraphObj, scenarioFlag);
}


function loopRoutes(routeArr, graphObject, sceFlag)
{
	var loopIndex = 0;
	var currentElement = null;
	
	var currentStopCount = -1;
	var currentStart = -1;
	var currentEnd = -1;
	
	for (loopIndex = 0; loopIndex < routeArr.length; loopIndex = loopIndex + 1)
	{
		currentElement = routeArr[loopIndex];
		currentStopCount = -1;
		currentStart = -1;
		currentEnd = -1;
		
		checkBaseSchema(currentElement);
		checkBaseDistance(currentElement.route.distance);
		checkBaseSequence(currentElement.route, graphObject);
		
		currentStopCount = currentElement.route.steps.length - 1;
		currentStart = currentElement.route.steps[0];
		currentEnd = currentElement.route.steps[currentStopCount];
		
		if (sceFlag === testScenarios.ONE_WAY)
		{
			expect(true).to.be.true;
		}
		
	}
}


function checkBaseSchema(entryObject)
{	
	expect(entryObject).to.not.be.undefined;
	expect(entryObject).to.not.be.null;
	expect(entryObject).to.be.an("object");
	
	expect(entryObject).to.have.property("route");
	expect(entryObject).to.have.property("valid");
	
	expect(entryObject.route).to.not.be.undefined;
	expect(entryObject.route).to.not.be.null;
	expect(entryObject.route).to.be.an("object");
	
	expect(entryObject.valid).to.be.true;
	
	expect(entryObject.route).to.have.property("steps");
	expect(entryObject.route).to.have.property("distance");
	
	expect(entryObject.route.steps).to.be.an("array");
	expect(entryObject.route.steps.length).to.be.at.least(2);
}


function checkBaseDistance(distVal)
{
	var correctType = Number.isInteger(distVal);
	
	expect(correctType, "Distance must be a valid, whole number.").to.be.true;
	expect(distVal).to.be.above(0);
}


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
	
	while (stepIndex >= 0 && stepIndex <= stepCutoff && sequenceValid === true)
	{
		currentNodeIndex = routeObj.steps[stepIndex];
		currentOffsetIndex = routeObj.steps[stepIndex + 1];
		currentNodeExists = (currentNodeIndex >= 0 && currentNodeIndex < graphObj.nodes.length);
		currentOffsetExists = (currentOffsetIndex >= 0 && currentOffsetIndex < graphObj.nodes.length);
		currentDistance = -1;
		currentMatch = false;
		
		if (currentNodeExists === true && currentOffsetExists === true)
		{
			currentDistance = searchEdge(graphObj.edges, currentNodeIndex, currentOffsetIndex);
		}
		
		if (currentDistance > 0)
		{
			estimatedDistance += currentDistance;
			currentMatch = true;
		}
		
		if (currentMatch !== true)
		{
			sequenceValid = false;
		}
		
		stepIndex = stepIndex + 1;
	}
	
	
	if (sequenceValid === true)
	{
		expect(routeObj.distance).to.equal(estimatedDistance);
	}
	else
	{
		throw new Error("Impossible route");
	}
}


function searchEdge(edgeArr, srcNode, destNode)
{
	var edgeIndex = 0;
	var currentEdge = {};
	var searchRes = -1;
	
	while (edgeIndex >= 0 && edgeIndex < edgeArr.length && searchRes < 0)
	{
		currentEdge = edgeArr[edgeIndex];
		
		if (currentEdge.origin === srcNode && currentEdge.destination === destNode)
		{
			searchRes = currentEdge.distance;
		}
		
		edgeIndex = edgeIndex + 1;
	}
	
	return searchRes;
}



module.exports =
{
	checkObject: checkResultObject
};