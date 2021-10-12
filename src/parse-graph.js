const errorMessages = require("./common/error-messages");
const graphTasks = require("./common/graph-tasks");
const graphRegex = /^([A-Z][A-Z]\d+,)+([A-Z][A-Z]\d+)$/gi;
const spaceChars = /\s+/g;


function performInputParsing(rawContents)
{
	var prepContents = rawContents;
	var syntaxFlag = -1;
	var graphParts = [];
	var parseRes = {};
	
	parseRes["nodes"] = [];
	parseRes["edges"] = [];
	parseRes["valid"] = false;
	
	prepContents = prepContents.replace(spaceChars, "");
	prepContents = prepContents.toUpperCase();
	syntaxFlag = prepContents.search(graphRegex);
	
	if (syntaxFlag === 0)
	{
		graphParts = prepContents.split(",");
		loopGraphParts(graphParts, parseRes);
		parseRes.valid = true;
	}
	else
	{
		errorMessages.displayGraphSyntax();
	}
	
	return parseRes;
}


function loopGraphParts(partsArray, graphObject)
{
	var partIndex = 0;
	var currentPart = "";
	var currentOriginChar = "";
	var currentDestChar = "";
	var currentDistance = NaN;
	var currentLengthGiven = false;
	var currentOriginID = -1;
	var currentDestID = -1;
	var currentValid = false;
	var currentExists = null;
	var currentEdge = {};
	
	var canContinue = true;
	
	while (partIndex >= 0 && partIndex < partsArray.length && canContinue === true)
	{
		currentPart = partsArray[partIndex];
		currentOriginChar = currentPart.charAt(0);
		currentDestChar = currentPart.charAt(1);
		currentDistance = castDistance(currentPart);
		currentLengthGiven = checkDistanceValid(currentDistance);
		currentValid = false;
		currentExists = null;
		currentEdge = {};
		
		if (currentLengthGiven === true)
		{
			currentOriginID = getNodeID(currentOriginChar, graphObject.nodes);
			currentDestID = getNodeID(currentDestChar, graphObject.nodes);
			currentValid = true;
			currentExists = graphTasks.getEdge(currentOriginID, currentDestID, graphObject.edges);
		}
		
		if (currentValid === true && currentExists === null)
		{
			currentEdge["origin"] = currentOriginID;
			currentEdge["destination"] = currentDestID;
			currentEdge["distance"] = currentDistance;
			
			graphObject.edges.push(currentEdge);
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


function getNodeID(tgtChar, nodeArray)
{
	var matchIndex = nodeArray.indexOf(tgtChar);
	var resultID = -1;
	
	if (matchIndex >= 0 && matchIndex < nodeArray.length)
	{
		resultID = matchIndex;
	}
	else
	{
		nodeArray.push(tgtChar);
		resultID = nodeArray.length - 1;
	}
	
	return resultID;
}



module.exports =
{
	performParsing: performInputParsing
};