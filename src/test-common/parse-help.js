// Helper functions for 'graph parse' unit tests.

const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;

const maxEdgesNum = 300;
const alphabetString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


// Convert alphabet string into node array.
function getNodeListObject(entryStr)
{
	var listRes = entryStr.split("");
	return listRes;
}



// Defines graph containing every possible node.
function defineAlphabetGraphString()
{
	var defineRes = "";
	
	defineRes += "AB1, CD2, EF3, GH4, IJ5, KL6, MN7, OP8, QR9, ST10, UV11, WX12, YZ13, ";
	defineRes += "ZY14, XW15, VU16, TS17, RQ18, PO19, NM20, LK21, JI22, HG23, FE24, DC25, BA26";
	
	return defineRes;
}


// Generates a graph with the maximum number of edges.
function defineMaxEdgesGraphString()
{
	var originIndex = -1;
	var destinationIndex = -1;
	var distanceNumber = 10;
	
	var currentOriginNode = "";
	var currentDestinationNode = "";
	var currentPart = "";
	
	var partArray = [];
	var loopCutoff = Math.ceil(maxEdgesNum * 1.15);
	var defineRes = "";
	
	// Loop until target number of edges generated, or every possible combination explored.
	while (partArray.length < loopCutoff && originIndex < alphabetString.length)
	{
		
		// Checks if end of alphabet reached for destination node.
		if (destinationIndex <= 0)
		{
			// Start again from A-Z on next origin.
			originIndex += 1;
			destinationIndex = 0;
		}
		
		// Origin and destination nodes cannot be the same.
		if (originIndex !== destinationIndex)
		{
			// Create edge part.
			currentOriginNode = alphabetString.charAt(originIndex);
			currentDestinationNode = alphabetString.charAt(destinationIndex);
			currentPart = [currentOriginNode, currentDestinationNode, distanceNumber].join("");
			partArray.push(currentPart);
			
			// Increment distance.
			distanceNumber += 1;
		}
		
		
		// Update destination node index.
		destinationIndex += 1;
		destinationIndex = (destinationIndex % alphabetString.length);
	}
	
	
	// Write graph string from parts.
	defineRes = partArray.join();
	return defineRes;
}



// Validates parse result object.
function checkParseResultObject(parseObj)
{
	expect(parseObj).to.exist;
	expect(parseObj).to.be.an("object");
	
	expect(parseObj).to.have.property("nodes");
	expect(parseObj).to.have.property("edges");
	expect(parseObj).to.have.property("valid");
	
	expect(parseObj.nodes).to.be.an("array");
	expect(parseObj.edges).to.be.an("array");
	
	expect(parseObj.nodes.length).to.be.at.least(2);
	expect(parseObj.edges.length).to.be.at.least(2);
	
	expect(parseObj.valid).to.be.true;
}


// Checks whether parsed graph matches the given contents.
function checkResultGraphContents(parseObj, nodeArr, edgeArr)
{
	expect(parseObj.nodes).to.deep.equal(nodeArr);
	expect(parseObj.edges).to.deep.equal(edgeArr);
}



module.exports =
{
	maxEdges: maxEdgesNum,
	alphabet: alphabetString,
	getNodeList: getNodeListObject,
	defineAlphabetGraph: defineAlphabetGraphString,
	defineMaxEdgesGraph: defineMaxEdgesGraphString,
	checkParseResult: checkParseResultObject,
	checkGraphContents: checkResultGraphContents
};