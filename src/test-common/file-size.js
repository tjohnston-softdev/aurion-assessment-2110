// Validates file size number in bytes.
function checkBytesNumber(sBytes)
{
	var correctType = Number.isInteger(sBytes);
	var checkRes = (correctType && sBytes > 0);
	
	if (!checkRes) throw new Error("File size must be a positive, whole number.");
	
	
	return checkRes;
}



module.exports =
{
	checkBytes: checkBytesNumber
};