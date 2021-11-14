// Validates file size number in bytes.
function checkBytesNumber(sBytes)
{
	var correctType = Number.isInteger(sBytes);
	var checkRes = (correctType === true && sBytes > 0);
	
	if (checkRes !== true)
	{
		throw new Error("File size must be a positive, whole number.");
	}
	
	
	return checkRes;
}



module.exports =
{
	checkBytes: checkBytesNumber
};