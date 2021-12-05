// Unit tests for 'shortest route' pathfinding.

const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const correctCases = require("./shortest/correct-cases");
const invalidCases = require("./shortest/invalid-cases");


// Main Function
function runTests()
{
	describe("Shortest Route", function()
	{
		correctCases.callTests();
		invalidCases.callTests();
	});
}

module.exports = runTests;