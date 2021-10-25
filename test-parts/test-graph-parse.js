const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const parseGraph = require("../src/parse-graph");


function runTests()
{
	describe("Parse Graph", function()
	{
		handleValidCase();
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
			
			checkParseResult(resultValue, inclNodes, inclEdges);
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


function checkParseResult(parseObj, nodeArr, edgeArr)
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
	
	expect(parseObj.nodes).to.deep.equal(nodeArr);
	expect(parseObj.edges).to.deep.equal(edgeArr);
}



module.exports = runTests;