# Aurion Assessment (October 2021)

This is my submission for a technical assessment as part of a software developer position I applied for with [Aurion](https://aurion.com/). The challenge was to examine a rail network in an imaginary city represented as a weighted graph, and implement various pathfinding algorithms to fulfil different test cases. The cases consisted of following an exact route, finding all possible paths between stops under certain criteria, and finding the shortest path between stops.

Assessment instructions were sent as a MS Word document which I interpreted into a [markdown file](./instructions.md) along with personal implementation details.

This attempt was developed across 12-15 October 2021 and immediately shared to the general public. An updated version with unit tests was released on 27 October 2021. A final version was released on 12 December 2021 based on suggestions from the hiring managers.

## Running

**Submission**  
Execute `node submission [input-path]`

\
**Unit Tests**  
Execute `npm install` to download the unit testing suite, and then execute any of the following commands to run different unit tests:

* `npm run test-input` - Read input file.
* `npm run test-parse` - Input graph parsing.
* `npm run test-exact` - Exact route pathfinding.
* `npm run test-shortest` - Shortest route pathfinding.
* `npm run test-possible` - Possible routes pathfinding.
* `npm run test-submission` - Assessment submission.

## References

* [Computerphile - Dijkstra's Algorithm](https://www.youtube.com/watch?v=GazC3A4OQTE)
* [GeeksForGeeks - Dijkstra's Algorithm](https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/)
* [maze-graph-pathfinding](https://github.com/tjohnston-softdev/maze-graph-pathfinding) - Original work
* [Fantasy Name Generators](https://www.fantasynamegenerators.com/) - Generic names for city and suburbs in assessment instructions.
	* [City name](https://www.fantasynamegenerators.com/city-names.php)
	* [Suburb Names](https://www.fantasynamegenerators.com/city-district-names.php)
* [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) - Unit testing suite.

## Disclaimer

This submission is licensed under CC-BY 4.0. You can do whatever you want with it as long as attribution is given. I have been granted express permission by the hiring manager to share my submission. As I am completing this assessment as part of a recruitment program involving multiple companies, I have chosen to disclose the name of this particular company for clarification. I have taken care to reference any 3rd-party assets used in this project and they remain property of their respective owners.

![CC-BY 4.0](https://i.creativecommons.org/l/by/4.0/88x31.png)
