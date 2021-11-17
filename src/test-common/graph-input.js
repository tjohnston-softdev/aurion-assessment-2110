function getGraphInputObject()
{
	var resObj =
	{
		nodes: ['A', 'E', 'C', 'B', 'F', 'D', 'G', 'H'],
		edges:
		[
			{ origin: 0, destination: 1, distance: 14 },
			{ origin: 2, destination: 3, distance: 13 },
			{ origin: 1, destination: 3, distance: 7 },
			{ origin: 1, destination: 0, distance: 11 },
			{ origin: 3, destination: 4, distance: 10 },
			{ origin: 3, destination: 1, distance: 20 },
			{ origin: 3, destination: 5, distance: 3 },
			{ origin: 3, destination: 0, distance: 1 },
			{ origin: 0, destination: 2, distance: 2 },
			{ origin: 4, destination: 5, distance: 7 },
			{ origin: 6, destination: 7, distance: 9 }
		],
		valid: true
	};
	
	return resObj;
}


module.exports = getGraphInputObject();