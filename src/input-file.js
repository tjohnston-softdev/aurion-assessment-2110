const path = require("path");
const fs = require("fs");
const maxInpSize = 10000;

function readInputPathArgument(argList)
{
	var argsGiven = Array.isArray(argList);
	var retrievedArgument = "";
	var argType = "";
	var readRes = "input.txt";
	
	if (argsGiven === true && argList.length > 2)
	{
		retrievedArgument = argList[2];
		argType = typeof retrievedArgument;
	}
	
	if (argType === "string" && retrievedArgument.length > 0)
	{
		readRes = retrievedArgument;
	}
	
	return readRes;
}


module.exports =
{
	readPathArg: readInputPathArgument
};