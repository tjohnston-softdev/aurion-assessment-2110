// Reads test mode input from command line.
function readModeArgument(argList)
{
	var arrayExists = Array.isArray(argList);
	var passedValue = null;
	var argType = "";
	var readRes = "";
	
	if (arrayExists === true && argList.length > 2)
	{
		// Read corresponding argument.
		passedValue = argList[2];
		argType = typeof passedValue;
	}
	
	if (argType === "string" && passedValue.length > 0)
	{
		// Use value.
		readRes = passedValue;
	}
	
	return readRes;
}



module.exports =
{
	readArg: readModeArgument
};