const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const testInputFunctions = require("../test-parts/test-input-functions");

describe("Unit Tests", function()
{
	testInputFunctions();
});