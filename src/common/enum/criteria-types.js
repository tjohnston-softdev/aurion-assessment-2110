// Route criteria types


function defineOptions()
{
	var defineRes = {};
	
	defineRes["START_NODE"] = 1;
	defineRes["END_NODE"] = 2;
	defineRes["STOP_COUNT"] = 3;
	defineRes["TOTAL_DISTANCE"] = 4;
	
	return defineRes;
}


module.exports = defineOptions();