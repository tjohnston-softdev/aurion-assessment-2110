const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const parseGraph = require("../../src/parse-graph");
const parseHelp = require("../../src/test-common/parse-help");
const parseOutputData = require("../../src/test-common/parse-output");


function callValidTest()
{
	describe("Valid Case", function()
	{
		it("Complete Graph", function()
		{
			var inclNodes = parseHelp.getNodeList("MEOWHIS");
			var resultValue = parseGraph.performParsing("ME7, OW8, HI9, SH10");
			
			parseHelp.checkParseResult(resultValue);
			parseHelp.checkGraphContents(resultValue, inclNodes, parseOutputData.valid);
		});
		
	});
}



module.exports =
{
	callTest: callValidTest
};