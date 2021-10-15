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
	var dispTxt = "";
	
	dispTxt += "Could not parse input into a valid graph.\r\n";
	dispTxt += "Input must follow the format:\r\n";
	dispTxt += "'AB5, BC4, CD8, [etc]'";
	
	outputToConsole(dispTxt);
}


function extractFileSystemError(fullMsg)
{
	var colonIndex = fullMsg.indexOf(": ");
	var subBegin = colonIndex + 2;
	var subEnd = fullMsg.indexOf(",", subBegin);
	
	var extractRes = fullMsg.substring(subBegin, subEnd);
	return extractRes;
}


function prepareFileSystemError(actionPart, reasonPart)
{
	var prepRes = ["Could not successfully ", actionPart, " input file - ", reasonPart, "."].join("");
	return prepRes;
}


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