// Unit testing for the assessment submission.

const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const inputFile = require("../src/input-file");
const parseGraph = require("../src/parse-graph");
const cases = require("../cases");

var inputGraphObject = null;


// Main function.
function runTests()
{
	describe("Submission", function()
	{
		handlePreparation();
		handleExampleCases();
		handleDispose();
	});
}


// Parse graph from input file.
function handlePreparation()
{
	describe("Preparation", function()
	{
		var targetInputPath = "input.txt";
		var rawText = null;
		
		it("Read Input File", function(done)
		{
			var inpEntry = inputFile.getEntry(targetInputPath);
			var inpValid = inputFile.validateEntry(inpEntry);
			rawText = inputFile.readContents(targetInputPath);
			
			done();
		});
		
		it("Parse Graph", function(done)
		{
			inputGraphObject = parseGraph.performParsing(rawText);
			rawText = null;
			done();
		});
		
	});
}


// Run example cases.
function handleExampleCases()
{
	describe("Example Cases", function()
	{
		it("Case 1", function()
		{
			var resultValue = cases.runCase1(inputGraphObject);
			checkResultValue(resultValue);
		});
		
		it("Case 2", function()
		{
			var resultValue = cases.runCase2(inputGraphObject);
			checkResultValue(resultValue);
		});
		
		it("Case 3", function()
		{
			var resultValue = cases.runCase3(inputGraphObject);
			checkResultValue(resultValue);
		});
		
		it("Case 4", function()
		{
			var resultValue = cases.runCase4(inputGraphObject);
			checkResultValue(resultValue);
		});
		
		it("Case 5", function()
		{
			var resultValue = cases.runCase5(inputGraphObject);
			checkResultValue(resultValue);
		});
		
		it("Case 6", function()
		{
			var resultValue = cases.runCase6(inputGraphObject);
			checkResultValue(resultValue);
		});
		
		it("Case 7", function()
		{
			var resultValue = cases.runCase7(inputGraphObject);
			checkResultValue(resultValue);
		});
		
		it("Case 8", function()
		{
			var resultValue = cases.runCase8(inputGraphObject);
			checkResultValue(resultValue);
		});
		
		it("Case 9", function()
		{
			var resultValue = cases.runCase9(inputGraphObject);
			checkResultValue(resultValue);
		});
		
		it("Case 10", function()
		{
			var resultValue = cases.runCase10(inputGraphObject);
			checkResultValue(resultValue);
		});
	});
}


// Dispose input graph after example cases tested.
function handleDispose()
{
	describe("Dispose Input Graph", function()
	{
		it("Successful", function(done)
		{
			inputGraphObject = null;
			done();
		});
	});
}


// Validates example case result.
function checkResultValue(rVal)
{
	expect(rVal).to.exist;
	expect(rVal).to.be.an("object");
	
	expect(rVal).to.have.property("expected");
	expect(rVal).to.have.property("actual");
	
	expect(rVal.actual).to.equal(rVal.expected);
}



module.exports = runTests;