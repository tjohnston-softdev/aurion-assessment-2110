function prepareMessageText(validResObj)
{
	var prepTxt = validResObj.reason;
	
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