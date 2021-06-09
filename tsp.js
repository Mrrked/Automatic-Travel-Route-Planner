// Javascript implementation of the approach
var V = 4;
var ans = 1000000000;
// Boolean array to check if a node
// has been visited or not
var v = Array(n).fill(false);
// Mark 0th node as visited
v[0] = true;

// Function to find the minimum weight Hamiltonian Cycle
function tsp(graph, currPos, n, count, cost)
{

	// If last node is reached and it has a link
	// to the starting node i.e the source then
	// keep the minimum value out of the total cost
	// of traversal and "ans"
	// Finally return to check for more possible values
	if (count == n && graph[currPos][0]) {
		ans = Math.min(ans, cost + graph[currPos][0]);
		return;
	}

	// BACKTRACKING STEP
	// Loop to traverse the adjacency list
	// of currPos node and increasing the count
	// by 1 and cost by graph[currPos][i] value
	for (var i = 0; i < n; i++) {
		if (!v[i] && graph[currPos][i]) {

			// Mark as visited
			v[i] = true;
			tsp(graph, i, n, count + 1,
				cost + graph[currPos][i]);

			// Mark ith node as unvisited
			v[i] = false;
		}
	}
};

// Driver code
// n is the number of nodes i.e. V
var n = 4;
var graph = [
	[ 0, 10, 15, 20 ],
	[ 10, 0, 35, 25 ],
	[ 15, 35, 0, 30 ],
	[ 20, 25, 30, 0 ]
];

// Find the minimum weight Hamiltonian Cycle
tsp(graph, 0, n, 1, 0);
// ans is the minimum weight Hamiltonian Cycle
console.log(ans)