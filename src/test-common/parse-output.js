function getParseOutputObject()
{
	var resObj =
	{
		"valid":
		[
			{"origin": 0, "destination": 1, "distance": 7},
			{"origin": 2, "destination": 3, "distance": 8},
			{"origin": 4, "destination": 5, "distance": 9},
			{"origin": 6, "destination": 4, "distance": 10}
		],
		"whitespace":
		[
			{"origin": 0, "destination": 1, "distance": 3},
			{"origin": 2, "destination": 3, "distance": 6},
			{"origin": 4, "destination": 5, "distance": 5},
			{"origin": 6, "destination": 7, "distance": 8},
			{"origin": 8, "destination": 9, "distance": 10}
		],
		"caseSensitivity":
		[
			{"origin": 0, "destination": 1, "distance": 8},
			{"origin": 2, "destination": 3, "distance": 16}
		],
		"duplicate":
		[
			{"origin": 0, "destination": 1, "distance": 5},
			{"origin": 2, "destination": 3, "distance": 7}
		],
		"recursive":
		[
			{"origin": 0, "destination": 1, "distance": 6},
			{"origin": 3, "destination": 4, "distance": 12}
		],
		"zeroDistance":
		[
			{"origin": 0, "destination": 1, "distance": 8},
			{"origin": 2, "destination": 3, "distance": 16}
		],
		"distanceTooLong":
		[
			{"origin": 0, "destination": 1, "distance": 1},
			{"origin": 2, "destination": 3, "distance": 1000}
		]
	}
	
	return resObj;
}


module.exports =
{
	getObject: getParseOutputObject
};