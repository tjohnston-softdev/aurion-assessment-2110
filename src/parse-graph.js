// This script parses input contents into a weighted graph.

const errorMessages = require("./common/error-messages");
const graphTasks = require("./common/graph-tasks");
const graphRegex = /^([A-Z][A-Z]\d+,)+([A-Z][A-Z]\d+)$/gi;
const spaceChars = /\s+/g;

// Main function.
function performInputParsing(rawContents)
{
	var prepContents = rawContents;
	var syntaxFlag = -1;
	var graphParts = [];
	var parseRes = graphTasks.defineGraph();
	
	// Remove whitespace characters and casing.
	prepContents = prepContents.replace(spaceChars, "");
	prepContents = prepContents.toUpperCase();
	
	// Validate syntax.
	syntaxFlag = prepContents.search(graphRegex);
	
	if (syntaxFlag === 0)
	{
		// Syntax valid, continue parsing.
		graphParts = prepContents.split(",");		// Split input text by comma, representing different edges.
		loopGraphParts(graphParts, parseRes);
		validateGraphParse(parseRes);
	}
	else
	{
		// Syntax error.
		errorMessages.displayGraphSyntax();
	}
	
	return parseRes;
}


// Parse graph input edge-by-edge.
function loopGraphParts(partsArray, graphObject)
{
	var partIndex = 0;
	var currentPart = "";
	var currentOriginChar = "";
	var currentDestChar = "";
	var currentDistance = NaN;
	var currentLengthValid = false;
	var currentOriginID = -1;
	var currentDestID = -1;
	var currentPrepared = false;
	var currentExists = null;
	
	var canContinue = true;
	
	// Loop input edge strings.
	while (partIndex >= 0 && partIndex < partsArray.length && canContinue === true && graphObject.edges.length < 300)
	{
		// Read current string.
		currentPart = partsArray[partIndex];
		
		// Read node characters.
		currentOriginChar = currentPart.charAt(0);
		currentDestChar = currentPart.charAt(1);
		
		// Read edge distance.
		currentDistance = castDistance(currentPart);
		currentLengthValid = checkDistanceValid(currentDistance);
		currentPrepared = false;
		currentExists = null;
		
		
		if (currentLengthValid === true)
		{
			// Add nodes to graph and check if edge exists.
			currentOriginID = graphTasks.addNode(currentOriginChar, graphObject.nodes);
			currentDestID = graphTasks.addNode(currentDestChar, graphObject.nodes);
			currentPrepared = true;
			currentExists = graphTasks.getEdge(currentOriginID, currentDestID, graphObject.edges);
		}
		
		if (currentPrepared === true && currentExists === null)
		{	
			// Add edge to graph.
			graphTasks.addEdge(currentOriginID, currentDestID, currentDistance, graphObject.edges);
		}
		
		
		partIndex = partIndex + 1;
	}
}


// Validate parsed graph.
function validateGraphParse(graphObject)
{
	if (graphObject.nodes.length >= 2 && graphObject.edges.length >= 2)
	{
		// Object counts valid.
		graphObject.valid = true;
	}
	else
	{
		// Invalid object counts.
		errorMessages.displayInvalidGraph();
	}
}

// Converts distance string to number.
function castDistance(partStr)
{
	var subTxt = partStr.substring(2);
	var castRes = Number(subTxt);
	return castRes;
}


// Checks if distance is a valid, whole, positive number.
function checkDistanceValid(distNum)
{
	var correctType = Number.isInteger(distNum);
	var checkRes = (correctType === true && distNum > 0 && distNum <= 1000000000);
	return checkRes;
}



module.exports =
{
	performParsing: performInputParsing
};