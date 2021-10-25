const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const parseGraph = require("../src/parse-graph");

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const maxEdges = 300;


function runTests()
{
	describe("Parse Graph", function()
	{
		handleValidCase();
		handleIgnoreData();
	});
}


function handleValidCase()
{
	describe("Valid Case", function()
	{
		it("Complete Graph", function()
		{
			var inclNodes = ["M", "E", "O", "W", "H", "I", "S"];
			var inclEdges = defineValidCaseEdges();
			var resultValue = parseGraph.performParsing("ME7, OW8, HI9, SH10");
			
			checkParseResult(resultValue);
			checkGraphContents(resultValue, inclNodes, inclEdges);
		});
		
	});
}


function handleIgnoreData()
{
	describe("Ignore Data", function()
	{
		it("Whitespace", function()
		{
			var inpGraph = "AB3, CD6,EF5,         GH8, IJ10";
			var inclNodes = "ABCDEFGHIJ".split("");
			var inclEdges = defineWhitespaceEdges();
			var resultValue = parseGraph.performParsing(inpGraph);
			
			checkParseResult(resultValue);
			checkGraphContents(resultValue, inclNodes, inclEdges);
		});
		
		
		it("Case Sensitivity", function()
		{
			var inclNodes = "ABCD".split("");
			var inclEdges = defineCaseSensitivityEdges();
			var resultValue = parseGraph.performParsing("Ab8, cD16");
			
			checkParseResult(resultValue);
			checkGraphContents(resultValue, inclNodes, inclEdges);
		});
		
		it("All Possible Nodes", function()
		{
			var inpGraph = defineAlphabetGraph();
			var inclNodes = alphabet.split("");
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
			var inclNodes = "ABCD".split("");
			var inclEdges = defineDupeEdges();
			var resultValue = parseGraph.performParsing("AB5, CD7, AB9");
			
			checkParseResult(resultValue);
			checkGraphContents(resultValue, inclNodes, inclEdges);
		});
		
		it("Recursive Edge", function()
		{
			var inclNodes = "ABCDE".split("");
			var inclEdges = defineRecurseEdges();
			var resultValue = parseGraph.performParsing("AB6, CC10, DE12");
			
			checkParseResult(resultValue);
			checkGraphContents(resultValue, inclNodes, inclEdges);
		});
		
		it("Zero Distance", function()
		{
			var inclNodes = "ABEF".split("");
			var inclEdges = defineZeroDistEdges();
			var resultValue = parseGraph.performParsing("AB8, CD0, EF16");
			
			checkParseResult(resultValue);
			checkGraphContents(resultValue, inclNodes, inclEdges);
		});
		
	});
}



function defineValidCaseEdges()
{
	var edgeRes =
	[
		{"origin": 0, "destination": 1, "distance": 7},
		{"origin": 2, "destination": 3, "distance": 8},
		{"origin": 4, "destination": 5, "distance": 9},
		{"origin": 6, "destination": 4, "distance": 10}
	];
	
	return edgeRes;
}


function defineWhitespaceEdges()
{
	var edgeRes =
	[
		{"origin": 0, "destination": 1, "distance": 3},
		{"origin": 2, "destination": 3, "distance": 6},
		{"origin": 4, "destination": 5, "distance": 5},
		{"origin": 6, "destination": 7, "distance": 8},
		{"origin": 8, "destination": 9, "distance": 10}
	];
	
	return edgeRes;
}


function defineCaseSensitivityEdges()
{
	var edgeRes =
	[
		{"origin": 0, "destination": 1, "distance": 8},
		{"origin": 2, "destination": 3, "distance": 16},
	];
	
	return edgeRes;
}


function defineDupeEdges()
{
	var edgeRes =
	[
		{"origin": 0, "destination": 1, "distance": 5},
		{"origin": 2, "destination": 3, "distance": 7},
	];
	
	return edgeRes;
}


function defineRecurseEdges()
{
	var edgeRes =
	[
		{"origin": 0, "destination": 1, "distance": 6},
		{"origin": 3, "destination": 4, "distance": 12},
	];
	
	return edgeRes;
}


function defineZeroDistEdges()
{
	var edgeRes =
	[
		{"origin": 0, "destination": 1, "distance": 8},
		{"origin": 2, "destination": 3, "distance": 16},
	];
	
	return edgeRes;
}



function defineAlphabetGraph()
{
	var stringRes = "";
	
	stringRes += "AB1, CD2, EF3, GH4, IJ5, KL6, MN7, OP8, QR9, ST10, UV11, WX12, YZ13, ";
	stringRes += "ZY14, XW15, VU16, TS17, RQ18, PO19, NM20, LK21, JI22, HG23, FE24, DC25, BA26";
	
	return stringRes;
}


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
	var stringRes = "";
	
	while (partArray.length < loopCutoff && originIndex < alphabet.length)
	{
		if (destinationIndex <= 0)
		{
			originIndex += 1;
			destinationIndex = 0;
		}
		
		if (originIndex !== destinationIndex)
		{
			currentOriginNode = alphabet.charAt(originIndex);
			currentDestinationNode = alphabet.charAt(destinationIndex);
			currentPart = [currentOriginNode, currentDestinationNode, distanceNumber].join("");
			partArray.push(currentPart);
			
			distanceNumber += 1;
		}
		
		destinationIndex += 1;
		destinationIndex = (destinationIndex % alphabet.length);
	}
	
	stringRes = partArray.join();
	return stringRes;
}



function checkParseResult(parseObj)
{
	expect(parseObj).to.not.be.undefined;
	expect(parseObj).to.not.be.null;
	expect(parseObj).to.be.an("object");
	
	expect(parseObj).to.have.property("nodes");
	expect(parseObj).to.have.property("edges");
	expect(parseObj).to.have.property("valid");
	
	expect(parseObj.nodes).to.be.an("array").that.is.not.empty;
	expect(parseObj.edges).to.be.an("array").that.is.not.empty;
	expect(parseObj.valid).to.be.true;
}


function checkGraphContents(parseObj, nodeArr, edgeArr)
{
	expect(parseObj.nodes).to.deep.equal(nodeArr);
	expect(parseObj.edges).to.deep.equal(edgeArr);
}


module.exports = runTests;