function defineOptions()
{
	var defineRes = {};
	
	defineRes["ONE_WAY"] = 1;
	defineRes["START_END"] = 2;
	defineRes["STOPS_MIN"] = 3;
	defineRes["STOPS_MAX"] = 4;
	defineRes["STOPS_EXACT"] = 5;
	defineRes["STOPS_BETWEEN"] = 6;
	
	return defineRes;
}


module.exports = defineOptions();