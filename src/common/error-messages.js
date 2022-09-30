// Error message text functions.


function displayFileSystemErrorText(vAction, vErrorObject)
{
	var flaggedMessage = extractFileSystemError(vErrorObject.message);
	var dispTxt = prepareFileSystemError(vAction, flaggedMessage);
	outputToConsole(dispTxt);
}


function displayInputFileErrorText(vContext)
{
	var dispTxt = "Input file " + vContext;
	outputToConsole(dispTxt);
}


function displayGraphSyntaxErrorText()
{	
	var dispTxt = "Could not parse input into a valid graph.\r\n";
	dispTxt += "Input must follow the format:\r\n";
	dispTxt += "'AB5, BC4, CD8, [etc]'";
	
	outputToConsole(dispTxt);
}


function displayInvalidGraphErrorText()
{
	outputToConsole("Parsed graph must have multiple nodes and edges.");
}


function extractFileSystemError(fullMsg)
{
	var colonIndex = fullMsg.indexOf(": ");
	var subBegin = colonIndex + 2;
	var subEnd = fullMsg.indexOf(",", subBegin);
	
	return fullMsg.substring(subBegin, subEnd);
}


function prepareFileSystemError(actionPart, reasonPart)
{
	return ["Could not successfully ", actionPart, " input file - ", reasonPart, "."].join("");
}


function outputToConsole(oText)
{
	throw new Error(oText);
}



module.exports =
{
	displayFileSystem: displayFileSystemErrorText,
	displayInputFile: displayInputFileErrorText,
	displayGraphSyntax: displayGraphSyntaxErrorText,
	displayInvalidGraph: displayInvalidGraphErrorText
};