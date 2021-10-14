function defineOptions()
{
	var defineRes = {};
	
	defineRes["LESS"] = -2;
	defineRes["LESS_EQUAL"] = -1;
	defineRes["EQUAL"] = 0;
	defineRes["GREAT"] = 1;
	defineRes["GREAT_EQUAL"] = 2;
	
	return defineRes;
}


module.exports = defineOptions();