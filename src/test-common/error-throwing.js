// Validates the result of a 'try-catch' unit test.
function checkTryCatchResult(trySuccessful, messageCorrect, expMsgTxt)
{
	var checkRes = false;
	
	if (trySuccessful)
	{
		throw new Error("No error was thrown.");
	}
	else if (messageCorrect)
	{
		checkRes = true;
	}
	else
	{
		flagIncorrectError(expMsgTxt);
	}
}


function flagIncorrectError(vExp)
{
	var preparedText = ["Incorrect error thrown\r\n", "Should had been: '", vExp, "'"].join("");
	throw new Error(preparedText);
}



module.exports =
{
	checkTryCatch: checkTryCatchResult
};