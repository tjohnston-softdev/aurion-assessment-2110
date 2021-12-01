function defineOptions()
{
	var defineRes = {};
	
	defineRes["ONE_WAY"] = 1;
	defineRes["START_SINGLE"] = 2;
	defineRes["START_MULT"] = 3;
	defineRes["END_SINGLE"] = 4;
	defineRes["END_MULT"] = 5;
	defineRes["ROUTE_TYPE"] = 6;
	
	return defineRes;
}


module.exports = defineOptions();