// Writes full error message text for 'possible routes' pathfinding.

function prepareMessageText(validResObj)
{
	var prepTxt = ["Invalid route criteria - ", validResObj.reason].join("");
	
	if (validResObj.itemNo > 0)
	{
		prepTxt += [" (Item ", validResObj.itemNo, ")"].join("");
	}
	
	return prepTxt.toUpperCase();
}



module.exports =
{
	prepareText: prepareMessageText
};