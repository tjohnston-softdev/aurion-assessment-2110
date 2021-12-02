const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const parseGraph = require("../../src/parse-graph");
const parseHelp = require("../../src/test-common/parse-help");
const parseOutputData = require("../../src/test-common/parse-output");


function callIgnoreDataTests()
{
	describe("Ignore Data", function()
	{
		it("Whitespace", function()
		{
			var inpGraph = "AB3, CD6,EF5,         GH8, IJ10";
			var inclNodes = parseHelp.getNodeList("ABCDEFGHIJ");
			var resultValue = parseGraph.performParsing(inpGraph);
			
			parseHelp.checkParseResult(resultValue);
			parseHelp.checkGraphContents(resultValue, inclNodes, parseOutputData.whitespace);
		});
		
		
		it("Case Sensitivity", function()
		{
			var inclNodes = parseHelp.getNodeList("ABCD");
			var resultValue = parseGraph.performParsing("Ab8, cD16");
			
			parseHelp.checkParseResult(resultValue);
			parseHelp.checkGraphContents(resultValue, inclNodes, parseOutputData.caseSensitivity);
		});
		
		it("All Possible Nodes", function()
		{
			var inpGraph = parseHelp.defineAlphabetGraph();
			var inclNodes = parseHelp.getNodeList(parseHelp.alphabet);
			var resultValue = parseGraph.performParsing(inpGraph);
			
			parseHelp.checkParseResult(resultValue);
			expect(resultValue.nodes).to.deep.equal(inclNodes);
			expect(resultValue.edges.length).to.equal(26);
		});
		
		it("Hard Edge Limit", function()
		{
			var inpGraph = parseHelp.defineMaxEdgesGraph();
			var resultValue = parseGraph.performParsing(inpGraph);
			
			parseHelp.checkParseResult(resultValue);
			expect(resultValue.nodes.length).to.be.at.least(2);
			expect(resultValue.edges.length).to.equal(parseHelp.maxEdges);
		});
		
		it("Duplicate Edges", function()
		{
			var inclNodes = parseHelp.getNodeList("ABCD");
			var resultValue = parseGraph.performParsing("AB5, CD7, AB9");
			
			parseHelp.checkParseResult(resultValue);
			parseHelp.checkGraphContents(resultValue, inclNodes, parseOutputData.duplicate);
		});
		
		it("Recursive Edge", function()
		{
			var inclNodes = parseHelp.getNodeList("ABCDE");
			var resultValue = parseGraph.performParsing("AB6, CC10, DE12");
			
			parseHelp.checkParseResult(resultValue);
			parseHelp.checkGraphContents(resultValue, inclNodes, parseOutputData.recursive);
		});
		
		it("Zero Distance", function()
		{
			var inclNodes = parseHelp.getNodeList("ABEF");
			var resultValue = parseGraph.performParsing("AB8, CD0, EF16");
			
			parseHelp.checkParseResult(resultValue);
			parseHelp.checkGraphContents(resultValue, inclNodes, parseOutputData.zeroDistance);
		});
		
		it("Distance Too Long", function()
		{
			var inclNodes = parseHelp.getNodeList("ABEF");
			var resultValue = parseGraph.performParsing("AB1, CD9999999999999999999999999999999999, EF1000");
			
			parseHelp.checkParseResult(resultValue);
			parseHelp.checkGraphContents(resultValue, inclNodes, parseOutputData.distanceTooLong);
		});
		
		
	});
}


module.exports =
{
	callTests: callIgnoreDataTests
};