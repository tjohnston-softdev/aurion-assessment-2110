const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const inputFile = require("../src/input-file");
const parseGraph = require("../src/parse-graph");
const exactRoute = require("../src/exact-route");
const shortestRoute = require("../src/shortest-route");
const possibleRoutes = require("../src/possible-routes");

var inputGraphObject = null;


function runTests()
{
	describe("Submission", function()
	{
		it("Placeholder", function()
		{
			expect(true).to.be.true;
		});
	});
}



module.exports = runTests;