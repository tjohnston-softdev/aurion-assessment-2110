const graphTasks = require("./common/graph-tasks");
const dsktraTasks = require("./common/dsktra-tasks");

function findShortestRoute(graphObject, startNode, endNode)
{
	var dijkstraInfoObject = dsktraTasks.defineInfo();
	dsktraTasks.setNodes(dijkstraInfoObject, graphObject.nodes, startNode, endNode);
	
	if (dijkstraInfoObject.start !== null && dijkstraInfoObject.end !== null)
	{
		dsktraTasks.setClosed(dijkstraInfoObject);
	}
	else
	{
		// Unknown nodes.
	}
	
	return -1;
}






module.exports =
{
	findRoute: findShortestRoute
};