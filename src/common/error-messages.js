// Error message text functions.


// File system action.
function displayFileSystemErrorText(vAction, vErrorObject)
{
	var flaggedMessage = extractFileSystemError(vErrorObject.message);
	var dispTxt = prepareFileSystemError(vAction, flaggedMessage);
	outputToConsole(dispTxt);
}


// Input file.
function displayInputFileErrorText(vContext)
{
	var dispTxt = "Input file " + vContext;
	outputToConsole(dispTxt);
}


// Graph syntax.
function displayGraphSyntaxErrorText()
{
	var dispTxt = "";
	
	dispTxt += "Could not parse input into a valid graph.\r\n";
	dispTxt += "Input must follow the format:\r\n";
	dispTxt += "'AB5, BC4, CD8, [etc]'";
	
	outputToConsole(dispTxt);
}


// Reads message text from 'fs' error object.
function extractFileSystemError(fullMsg)
{
	var colonIndex = fullMsg.indexOf(": ");
	var subBegin = colonIndex + 2;
	var subEnd = fullMsg.indexOf(",", subBegin);
	
	var extractRes = fullMsg.substring(subBegin, subEnd);
	return extractRes;
}


// Writes full error text for file system action.
function prepareFileSystemError(actionPart, reasonPart)
{
	var prepRes = ["Could not successfully ", actionPart, " input file - ", reasonPart, "."].join("");
	return prepRes;
}


// Display message to console.
function outputToConsole(oText)
{
	console.log("ERROR:", oText);
}



module.exports =
{
	displayFileSystem: displayFileSystemErrorText,
	displayInputFile: displayInputFileErrorText,
	displayGraphSyntax: displayGraphSyntaxErrorText
};