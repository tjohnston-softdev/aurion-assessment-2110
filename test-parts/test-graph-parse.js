// Unit testing for graph parse.

const fs = require("fs");
const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const parseGraph = require("../src/parse-graph");

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const maxEdges = 300;
const formatErrorText = "Could not parse input into a valid graph.";
const arrayErrorText = "Parsed graph must have multiple nodes and edges.";

// External output edge data.
var parseOutputData = null;


// Main function.
function runTests()
{
	describe("Parse Graph", function()
	{
		loadOutputData();
		handleValidCase();
		handleIgnoreData();
		handleInvalidCases();
		disposeOutputData();
	});
}


// Reads external file containing output objects to validate against.
function loadOutputData()
{
	var rawContents = null;
	
	describe("Load Output Data", function()
	{
		it("File Read", function(done)
		{
			// Read file contents.
			rawContents = fs.readFileSync("./test-parts/parse-output.json", "utf8");
			done();
		});
		
		it("JSON Parsed", function(done)
		{
			// Parse as JSON.
			parseOutputData = JSON.parse(rawContents);
			rawContents = null;
			done();
		});
		
	});
}



// Test case for valid graph parsing.
function handleValidCase()
{
	describe("Valid Case", function()
	{
		it("Complete Graph", function()
		{
			var inclNodes = getNodeList("MEOWHIS");
			var resultValue = parseGraph.performParsing("ME7, OW8, HI9, SH10");
			
			checkParseResult(resultValue);
			checkGraphContents(resultValue, inclNodes, parseOutputData.valid);
		});
		
	});
}


// Test cases for data that is ignored without error.
function handleIgnoreData()
{
	describe("Ignore Data", function()
	{
		it("Whitespace", function()
		{
			var inpGraph = "AB3, CD6,EF5,         GH8, IJ10";
			var inclNodes = getNodeList("ABCDEFGHIJ");
			var resultValue = parseGraph.performParsing(inpGraph);
			
			checkParseResult(resultValue);
			checkGraphContents(resultValue, inclNodes, parseOutputData.whitespace);
		});
		
		
		it("Case Sensitivity", function()
		{
			var inclNodes = getNodeList("ABCD");
			var resultValue = parseGraph.performParsing("Ab8, cD16");
			
			checkParseResult(resultValue);
			checkGraphContents(resultValue, inclNodes, parseOutputData.caseSensitivity);
		});
		
		it("All Possible Nodes", function()
		{
			var inpGraph = defineAlphabetGraph();
			var inclNodes = getNodeList(alphabet);
			var resultValue = parseGraph.performParsing(inpGraph);
			
			checkParseResult(resultValue);
			expect(resultValue.nodes).to.deep.equal(inclNodes);
			expect(resultValue.edges.length).to.equal(26);
		});
		
		it("Hard Edge Limit", function()
		{
			var inpGraph = defineMaxEdgesGraph();
			var resultValue = parseGraph.performParsing(inpGraph);
			
			checkParseResult(resultValue);
			expect(resultValue.nodes.length).to.be.at.least(2);
			expect(resultValue.edges.length).to.equal(maxEdges);
		});
		
		it("Duplicate Edges", function()
		{
			var inclNodes = getNodeList("ABCD");
			var resultValue = parseGraph.performParsing("AB5, CD7, AB9");
			
			checkParseResult(resultValue);
			checkGraphContents(resultValue, inclNodes, parseOutputData.duplicate);
		});
		
		it("Recursive Edge", function()
		{
			var inclNodes = getNodeList("ABCDE");
			var resultValue = parseGraph.performParsing("AB6, CC10, DE12");
			
			checkParseResult(resultValue);
			checkGraphContents(resultValue, inclNodes, parseOutputData.recursive);
		});
		
		it("Zero Distance", function()
		{
			var inclNodes = getNodeList("ABEF");
			var resultValue = parseGraph.performParsing("AB8, CD0, EF16");
			
			checkParseResult(resultValue);
			checkGraphContents(resultValue, inclNodes, parseOutputData.zeroDistance);
		});
		
		it("Distance Too Long", function()
		{
			var inclNodes = getNodeList("ABEF");
			var resultValue = parseGraph.performParsing("AB1, CD9999999999999999999999999999999999, EF1000");
			
			checkParseResult(resultValue);
			checkGraphContents(resultValue, inclNodes, parseOutputData.distanceTooLong);
		});
		
		
	});
}


// Test cases that are invalid and will throw an error.
function handleInvalidCases()
{
	describe("Invalid Cases", function()
	{
		it("Invalid Type", function()
		{
			callInvalidEntry(null, "Cannot read property 'replace' of null");
		});
		
		it("Empty String", function()
		{
			callInvalidEntry("", formatErrorText);
		});
		
		it("Wrong String Format", function()
		{
			callInvalidEntry("Not Graph: XYZ", formatErrorText);
		});
		
		it("Single Edge Entry", function()
		{
			callInvalidEntry("AB1", formatErrorText);
		});
		
		it("Single Edge Output", function()
		{
			callInvalidEntry("AB1, AB2, AB3", arrayErrorText);
		});
		
		it("Single Node", function()
		{
			callInvalidEntry("AA1, AA2, AA3", arrayErrorText);
		});
		
		it("Single Node And Edge", function()
		{
			callInvalidEntry("AA4", formatErrorText);
		});
		
		it("Missing Destination", function()
		{
			callInvalidEntry("AB2, C3, DE4", formatErrorText);
		});
		
		it("Missing Distance", function()
		{
			callInvalidEntry("AB1, CD, EF3", formatErrorText);
		});
		
		it("Negative Distance", function()
		{
			callInvalidEntry("AB5, CD1, EF-5", formatErrorText);
		});
		
		it("Decimal Distance", function()
		{
			callInvalidEntry("AB1, CD1.5, EF2", formatErrorText);
		});
		
		it("Unsupported Node Character", function()
		{
			callInvalidEntry("QR2, $T3", formatErrorText);
		});
		
		it("Unsupported Distance Character", function()
		{
			callInvalidEntry("UV8, TSx", formatErrorText);
		});
		
		
	});
}


// Dispose external output data after unit tests complete.
function disposeOutputData()
{
	describe("Dispose Output Data", function()
	{
		it("Successful", function(done)
		{
			parseOutputData = null;
			done();
		});
	});
}


// Convert alphabet string into node array.
function getNodeList(entryStr)
{
	var listRes = entryStr.split("");
	return listRes;
}



// Defines graph containing every possible node.
function defineAlphabetGraph()
{
	var defineRes = "";
	
	defineRes += "AB1, CD2, EF3, GH4, IJ5, KL6, MN7, OP8, QR9, ST10, UV11, WX12, YZ13, ";
	defineRes += "ZY14, XW15, VU16, TS17, RQ18, PO19, NM20, LK21, JI22, HG23, FE24, DC25, BA26";
	
	return defineRes;
}


// Generates a graph with the maximum number of edges.
function defineMaxEdgesGraph()
{
	var originIndex = -1;
	var destinationIndex = -1;
	var distanceNumber = 10;
	
	var currentOriginNode = "";
	var currentDestinationNode = "";
	var currentPart = "";
	
	var partArray = [];
	var loopCutoff = Math.ceil(maxEdges * 1.15);
	var defineRes = "";
	
	// Loop until target number of edges generated, or every possible combination explored.
	while (partArray.length < loopCutoff && originIndex < alphabet.length)
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
			currentOriginNode = alphabet.charAt(originIndex);
			currentDestinationNode = alphabet.charAt(destinationIndex);
			currentPart = [currentOriginNode, currentDestinationNode, distanceNumber].join("");
			partArray.push(currentPart);
			
			// Increment distance.
			distanceNumber += 1;
		}
		
		
		// Update destination node index.
		destinationIndex += 1;
		destinationIndex = (destinationIndex % alphabet.length);
	}
	
	
	// Write graph string from parts.
	defineRes = partArray.join();
	return defineRes;
}


// Attempts to parse graph using 'try-catch' structure.
function callInvalidEntry(entryStr, desiredMessage)
{
	var parseSuccessful = false;
	var correctError = false;
	
	try
	{
		// Parse input.
		parseGraph.performParsing(entryStr);
		parseSuccessful = true;
	}
	catch(parseErr)
	{
		// Error caught.
		parseSuccessful = false;
		correctError = parseErr.message.startsWith(desiredMessage);
	}
	
	
	// Check result.
	if (parseSuccessful === true)
	{
		// No error.
		throw new Error("No error was thrown.");
	}
	else if (correctError === true)
	{
		// Valid.
		expect(true).to.be.true;
	}
	else
	{
		// Wrong error.
		flagIncorrectError(desiredMessage);
	}
	
}


// Validates parse result object.
function checkParseResult(parseObj)
{
	expect(parseObj).to.not.be.undefined;
	expect(parseObj).to.not.be.null;
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
function checkGraphContents(parseObj, nodeArr, edgeArr)
{
	expect(parseObj.nodes).to.deep.equal(nodeArr);
	expect(parseObj.edges).to.deep.equal(edgeArr);
}


// Incorrect error thrown in 'try-catch'
function flagIncorrectError(vExp)
{
	var preparedText = ["Incorrect graph parsing error thrown.\r\n", "Should had been: '", vExp, "'"].join("");
	throw new Error(preparedText);
}


module.exports = runTests;