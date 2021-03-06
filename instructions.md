# Developer Assessment

---

#### Problem Statement

The local commuter rail network in the City of Zadgas services a number of suburbs.  Because of resource limitations, all of the tracks are 'one-way'. That is, a route from Neodrek Plaza to Yisec Grove does not imply the existence of a route from Yisec Grove to Neodrek Plaza. In fact, even if both of these routes do happen to exist, they are distinct and are not necessarily the same distance!

The purpose of this problem is to help the rail network provide its customers with information about the routes. In particular, you will compute the distance along a certain route, the number of different routes between two suburbs, and the shortest route between two suburbs.

#### Input

A text file defining a directed graph where a node represents a suburb and an edge represents a route between two suburbs. The weighting of the edge represents the distance between the two suburbs. A given route will never appear more than once, and for a given route, the starting and ending suburbs will not be the same.

#### Output

For test cases 1 through 5, output the total distance of the given route. If no such route exists, output 'NO SUCH ROUTE'. You must follow the route exactly as given; do not make any extra stops! For example, test case #1 starts at suburb A, then travel directly to suburb B, then directly to suburb C. In the below graph input, the distance from A to B is 5, and from B to C is 4. This amounts to a total distance of 9 for that route.

For test cases 6, 7, and 10, output the number of possible routes meeting the given criteria. For test cases 8 and 9, output the total distance of the calculated route.

#### Test Cases

1. The distance of the route A-B-C.
2. The distance of the route A-D.
3. The distance of the route A-D-C.
4. The distance of the route A-E-B-C-D.
5. The distance of the route A-E-D.

6. The number of trips starting at C and ending at C with a maximum of 3 stops. In the sample data below, there are two such trips:  
• C-D-C (2 stops)  
• C-E-B-C (3 stops)

7. The number of trips starting at A and ending at C with exactly 4 stops. In the sample data below, there are three such trips:  
• A-B-C-D-C  
• A-D-C-D-C  
• A-D-E-B-C

8. The length of the shortest route (in terms of distance to travel) from A to C.
9. The length of the shortest route (in terms of distance to travel) from B to B.

10. The number of different routes from C to C with a distance of less than 30. In the sample data, the trips are:  
• C-D-C  
• C-E-B-C  
• C-E-B-C-D-C  
• C-D-C-E-B-C  
• C-D-E-B-C  
• C-E-B-C-E-B-C  
• C-E-B-C-E-B-C-E-B-C

#### Test Input

For the test input, the suburbs are named using the first few letters of the alphabet from A to E. A route between two suburbs (A to B) with a distance of 5 is represented as AB5.

**Graph:** `AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7`


#### Expected Output

| Test Case | Value |
|---|---|
| #1 | 9 |
| #2 | 5 |
| #3 | 13 |
| #4 | 22 |
| #5 | “NO SUCH ROUTE” |
| #6 | 2 |
| #7 | 3 |
| #8 | 9 |
| #9 | 9 |
| #10 | 7 |

#### Solution

We would like to see:

* How you planned and designed your approach.
* Written code.
* Test results.

#### Technical Requirements

* There must be a way to supply the application with the input data via text file.
* The application must execute successfully.
* You should provide sufficient evidence that your solution is complete by, as a minimum, indicating that it works correctly against the supplied test data.
* The application built to solve the problem should be constructed using TypeScript, and execute as a Node JS application.
* Provide a brief overview of the submission with guidance on how to:
	* Execute the application.
	* Execute the test suites that verify the logic.

---

# Implementation Details

#### Input

* The script input is a plain text file consisting of the graph definition as explained above.
* The text file content *must* be the graph and *only* the graph. Otherwise, errors will be raised during parsing.
* The input file path is an optional argument (eg. `node submission ./file.txt`).
	* If this is not entered, `input.txt` will be used as default.
* The file cannot be larger than 10KB. Otherwise, there will be an error.
* Error handling has been implemented for when the input file is being accessed.

#### Parsing

* All white-space is ignored, but it still counts against the file size limit.
* Input is not case-sensitive, so 'A' is the same as 'a'.
	* Letters are interpreted as upper-case.
* Graph uses the format: `AB5, BC4, [etc]`
	* If the graph does not use this format, there will be errors.
* A node is represented using an alphabet character: `[A-Z]`
* A graph must have multiple nodes and edges. Otherwise, there will be errors.
	* This is covered both during the initial format check and after the graph has been parsed.
* There is no hard limit on the number of nodes, but only alphabet characters are supported. (26 possible values)
* There is a hard limit of 300 edges. Further input will be ignored without error.
* Edges are only one-way, so 'BC' and 'CB' are different edges.
	* These edges can have different distances, even if they are the same nodes in the opposite direction.
* Duplicate edges are ignored without error. The first one takes priority.
* Recursive edges (eg. A to A) will be ignored without error.
* Edge distance must be a whole number between 1 and 1000000000 (a billion)
	* Higher numbers are ignored without error.
	* Negative and decimal values still cause errors during the initial format check because the respective characters are not allowed.

#### Pathfinding - Exact Route

* Input is a string with each character representing a node along the route.
* This string must have at least two characters.
* Messages are output for invalid route input.
* If the route is not possible or a node does not exist, output "NO SUCH ROUTE"
* Successful output is the total distance of the given route.

#### Pathfinding - Shortest Path

* Implemented using Dijkstra's algorithm.
* If the start or end nodes are missing, output message.
* If the end node was not visited, the algorithm was unsuccessful.
* Successful output is the total distance of the calculated route.

#### Pathfinding - Possible Routes

* Supports criteria for:
	* Start node(s)
	* End node(s)
	* Number of stops
	* Total distance
	* One-way routes (No backtracking)
	* Template pattern
* Any number of criteria can be used, even multiple of the same type.
* Route template patterns are defined as [Regular Expressions](https://www.w3schools.com/jsref/jsref_obj_regexp.asp) but with two differences:
	* `\s` and `\S` represent any start node.
	* `\e` and `\E` represent any end node.
* If any of the given criteria is invalid, output message.
* A route must meet *all* of the given criteria to be considered valid.
* If any of the end nodes cannot be reached from any of the start nodes in a direct sequence:
	* There are no possible routes to search.
	* The output will be zero.
* Pathfinding expands from the possible start nodes, creating new possible paths as nodes are visited.
* Backtracking is enabled by default, so nodes can be visited multiple times on a given route.
	* This can be disabled using the 'One Way' route criteria.
* If any of the end nodes are visited at *any* point, it is a completed route and will be processed accordingly.
	* A complete route is valid if the criteria is met and has at least one stop.
	* Invalid routes are temporarily stored to avoid repetition.
* Successful output is an array of all valid routes found, even if it is empty.
* If the given route criteria does not restrict the route size, output infinity.
	* eg. Two-way routes with no maximum distance or stop count.
* If there are no possible start nodes, output an empty array.

#### Output

* Result values for each test case are displayed to the console.
* For the submission itself, both the expected and actual values are displayed.
	* For the original submission, I thought implementing a full unit test suite would have been excessive given that we only had three days to complete the assessment.
	* Proper unit tests were implemented in an updated version.

#### Dependencies

* The submission itself uses no third-party packages. Everything is written in native Node JS.
* [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) are included as dependencies for the unit tests.

#### Unit Tests

* Implemented using [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/)
* The original submission script and the unit tests run completely separate from each other.
* Different scripts are used to run different tests:
	* Read input file: `npm run test-input`
	* Input graph parsing: `npm run test-parse`
	* Exact route pathfinding: `npm run test-exact`
	* Shortest route pathfinding: `npm run test-shortest`
	* Possible routes pathfinding: `npm run test-possible`
	* Assessment submission: `npm run test-submission`

----

[City name](https://www.fantasynamegenerators.com/city-names.php) and [Suburb Names](https://www.fantasynamegenerators.com/city-district-names.php) from *[Fantasy Name Generators](https://www.fantasynamegenerators.com/)*  
Retrieved 15 October 2021.
