const graphRegex = /^([A-Z][A-Z]\d+,)+([A-Z][A-Z]\d+)$/gi;
const spaceChars = /\s+/g;


function performInputParsing(rawContents)
{
	var prepContents = rawContents;
	var syntaxFlag = -1;
	var graphParts = [];
	var parseRes = {};
	
	parseRes["edges"] = [];
	parseRes["valid"] = false;
	
	prepContents = prepContents.replace(spaceChars, "");
	prepContents = prepContents.toUpperCase();
	syntaxFlag = prepContents.search(graphRegex);
	
	if (syntaxFlag === 0)
	{
		graphParts = prepContents.split(",");
		loopGraphParts(graphParts, parseRes.edges);
		parseRes.valid = true;
	}
	else
	{
		// Error
	}
	
	return parseRes;
}


function loopGraphParts(partsArray, edgeArr)
{
	var partIndex = 0;
	var currentPart = "";
	var currentOrigin = "";
	var currentDest = "";
	var currentDistance = NaN;
	var currentValid = false;
	var currentEdge = {};
	
	var canContinue = true;
	
	while (partIndex >= 0 && partIndex < partsArray.length && canContinue === true)
	{
		currentPart = partsArray[partIndex];
		currentOrigin = currentPart.charAt(0);
		currentDest = currentPart.charAt(1);
		currentDistance = castDistance(currentPart);
		currentValid = checkDistanceValid(currentDistance);
		currentEdge = {};
		
		if (currentValid === true)
		{
			currentEdge["origin"] = currentOrigin;
			currentEdge["destination"] = currentDest;
			currentEdge["distance"] = currentDistance;
			
			edgeArr.push(currentEdge);
		}
		
		partIndex = partIndex + 1;
	}
}


function castDistance(partStr)
{
	var subTxt = partStr.substring(2);
	var castRes = Number(subTxt);
	return castRes;
}


function checkDistanceValid(distNum)
{
	var correctType = Number.isInteger(distNum);
	var checkRes = (correctType === true && distNum > 0);
	return checkRes;
}



module.exports =
{
	performParsing: performInputParsing
};