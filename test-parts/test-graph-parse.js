// Unit testing for graph parse.

const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const validCase = require("./parse/valid-case");
const ignoreCases = require("./parse/ignore-cases");
const invalidCases = require("./parse/invalid-cases");


// Main function.
function runTests()
{
	describe("Parse Graph", function()
	{
		validCase.callTest();
		ignoreCases.callTests();
		invalidCases.callTests();
	});
}


module.exports = runTests;