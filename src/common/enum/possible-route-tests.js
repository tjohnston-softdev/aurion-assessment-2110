/*
	'Possible Route' test scenarios.
	Used for valid unit tests.
*/

function defineOptions()
{
	var defineRes = {};
	
	defineRes["ONE_WAY"] = 1;
	defineRes["START_END"] = 2;
	defineRes["STOPS_MIN"] = 3;
	defineRes["STOPS_MAX"] = 4;
	defineRes["STOPS_EXACT"] = 5;
	defineRes["STOPS_BETWEEN"] = 6;
	defineRes["DIST_MIN"] = 7;
	defineRes["DIST_MAX"] = 8;
	defineRes["DIST_EXACT"] = 9;
	defineRes["DIST_BETWEEN"] = 10;
	defineRes["TEMPLATE_EXACT"] = 11;
	defineRes["TEMPLATE_WILDCARD"] = 12;
	defineRes["TEMPLATE_SEQUENCE"] = 13;
	defineRes["TEMPLATE_CHOICE"] = 14;
	defineRes["TEMPLATE_INVERT"] = 15;
	defineRes["TEMPLATE_CHAR_GRPS"] = 16;
	defineRes["TEMPLATE_NEST"] = 17;
	defineRes["TEMPLATE_INT"] = 18;
	
	return defineRes;
}


module.exports = defineOptions();