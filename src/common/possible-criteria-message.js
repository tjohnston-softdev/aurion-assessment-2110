function prepareMessageText(validResObj)
{
	var prepTxt = ["Invalid route criteria - ", validResObj.reason].join("");
	
	if (validResObj.itemNo > 0)
	{
		prepTxt += [" (Item ", validResObj.itemNo, ")"].join("");
	}
	
	prepTxt = prepTxt.toUpperCase();
	return prepTxt;
}



module.exports =
{
	prepareText: prepareMessageText
};