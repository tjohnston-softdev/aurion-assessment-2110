const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const testInputFunctions = require("../test-parts/test-input-functions");
const testGraphParse = require("../test-parts/test-graph-parse");

describe("Unit Tests", function()
{
	testInputFunctions();
	testGraphParse();
});