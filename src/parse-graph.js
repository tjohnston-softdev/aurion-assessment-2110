// This script parses input contents into a weighted graph.

const errorMessages = require("./common/error-messages");
const graphTasks = require("./common/graph-tasks");
const graphRegex = /^([A-Z][A-Z]\d+,)+([A-Z][A-Z]\d+)$/gi;
const spaceChars = /\s+/g;

// Main function.
function performInputParsing(rawContents)
{
	
	// Remove whitespace characters and casing.
	var prepContents = rawContents.replace(spaceChars, "");
	prepContents = prepContents.toUpperCase();
	
	// Validate syntax.
	var syntaxFlag = prepContents.search(graphRegex);
	
	var graphParts = [];
	var parseRes = graphTasks.defineGraph();
	
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
	var canContinue = true;
	
	// Loop input edge strings.
	while (partIndex >= 0 && partIndex < partsArray.length && canContinue && graphObject.edges.length < 300)
	{
		// Read current string.
		var currentPart = partsArray[partIndex];
		
		// Read node characters.
		var currentOriginChar = currentPart.charAt(0);
		var currentDestChar = currentPart.charAt(1);
		
		// Read edge distance.
		var currentDistance = castDistance(currentPart);
		var currentLengthValid = checkDistanceValid(currentDistance);
		var currentOriginID = -1;
		var currentDestID = -1;
		var currentPrepared = false;
		var currentExists = null;
		
		
		if (currentLengthValid)
		{
			// Add nodes to graph and check if edge exists.
			currentOriginID = graphTasks.addNode(currentOriginChar, graphObject.nodes);
			currentDestID = graphTasks.addNode(currentDestChar, graphObject.nodes);
			currentPrepared = true;
			currentExists = graphTasks.getEdge(currentOriginID, currentDestID, graphObject.edges);
		}
		
		if (currentPrepared && currentExists === null)
		{	
			// Add edge to graph.
			graphTasks.addEdge(currentOriginID, currentDestID, currentDistance, graphObject.edges);
		}
		
		
		partIndex += 1;
	}
}


// Validate parsed graph.
function validateGraphParse(graphObject)
{
	graphObject.valid = (graphObject.nodes.length >= 2 && graphObject.edges.length >= 2)
	if (!graphObject.valid) errorMessages.displayInvalidGraph();
}

// Converts distance string to number.
function castDistance(partStr)
{
	var subTxt = partStr.substring(2);
	return Number(subTxt);
}


// Checks if distance is a valid, whole, positive number.
function checkDistanceValid(distNum)
{
	var correctType = Number.isInteger(distNum);
	return (correctType && distNum > 0 && distNum <= 1000000000);
}



module.exports =
{
	performParsing: performInputParsing
};