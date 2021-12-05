// 'Path argument reading' for input file unit tests.

const mocha = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const inputFile = require("../../src/input-file");

// Main function
function callArgumentTests()
{
	describe("Read Path Argument", function()
	{
		var defaultValue = "input.txt";
		
		it("Valid Entry", function()
		{
			var enteredPath = "./example-file.txt";
			var argArray = defineArgsObject(enteredPath);
			var resultValue = inputFile.readPathArg(argArray);
			expect(resultValue).to.equal(enteredPath);
		});
		
		it("Empty String", function()
		{
			var argArray = defineArgsObject("");
			var resultValue = inputFile.readPathArg(argArray);
			expect(resultValue).to.equal(defaultValue);
		});
		
		it("Invalid Argument Type", function()
		{
			var argArray = defineArgsObject(-1);
			var resultValue = inputFile.readPathArg(argArray);
			expect(resultValue).to.equal(defaultValue);
		});
		
		it("Empty Arguments Array", function()
		{
			var emptyArray = [];
			var resultValue = inputFile.readPathArg(emptyArray);
			expect(resultValue).to.equal(defaultValue);
		});
		
		it("Invalid Arguments Array Type", function()
		{
			var resultValue = inputFile.readPathArg(null);
			expect(resultValue).to.equal(defaultValue);
		});
		
	});
}



// Creates object simulating Node JS arguments, including file path.
function defineArgsObject(pthVal)
{
	var objectRes = [null, null, pthVal];
	return objectRes;
}


module.exports =
{
	callTests: callArgumentTests
};