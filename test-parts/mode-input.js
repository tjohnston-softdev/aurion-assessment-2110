function readModeArgument(argList)
{
	var arrayExists = Array.isArray(argList);
	var passedValue = null;
	var argType = "";
	var readRes = "";
	
	if (arrayExists === true && argList.length > 2)
	{
		passedValue = argList[2];
		argType = typeof passedValue;
	}
	
	if (argType === "string" && passedValue.length > 0)
	{
		readRes = passedValue;
	}
	
	return readRes;
}



module.exports =
{
	readArg: readModeArgument
};