const graphRegex = /^([A-Z][A-Z]\d+,)+([A-Z][A-Z]\d+)$/gi;
const spaceChars = /\s+/g;


function performInputParsing(rawContents)
{
	var prepContents = rawContents;
	var syntaxFlag = -1;
	var parseRes = {};
	
	parseRes["nodes"] = [];
	parseRes["edges"] = [];
	parseRes["valid"] = false;
	
	prepContents = prepContents.replace(spaceChars, "");
	prepContents = prepContents.toUpperCase();
	syntaxFlag = prepContents.search(graphRegex);
	
	if (syntaxFlag === 0)
	{
		// Loop Edges
	}
	else
	{
		// Error
	}
}