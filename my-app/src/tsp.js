export default function getRoute(graph) {
    //DECLARATION & INITIALIZATION OF NECESSARY INPUTS-----------------------------------------------

    
    // N x N adjacency matrix to contain weights of each direction.
    // NOTE: 
    
    //n is the number of nodes
    var n = graph.length;                              //4 is sample, you get input from user

    //Contains the nodes/location
    //You can use any unique indentification for every node
    var nodes = graph.map((weight, index) => index)

    //index of starting node: must be integer 
    //will be used as an int counter later
    var currPos = 0;                        // 0 means "A" node is the starting point
    
    //Container of the minimum cost/weight
    //Initially set to max
    var ans = 99999999999;

    // Boolean array to check if a node has been visited or not
    var v = Array(n).fill(false);

    //PROCESSING-------------------------------------------------------------------

    // var new_cost = 99999999999;

    //This Array stores the path / order of nodes
    var smallest_path = Array(n).fill(0);
    var cur_path = Array(n).fill(0);

    cur_path[0] = nodes[currPos];

    //Mark the starting node as visited
    v[currPos] = true;

    //Call Function
    tsp(graph, currPos, n, 1, 0);

    //This is the main RECURSIVE function
    function tsp(graph, currPos, n, count, cost){

        // If last node is reached and it has a link
        // to the starting node i.e the source then
        // keep the minimum value out of the total cost
        // of traversal and "ans"
        // Finally return to check for more possible values
        if (count === n && graph[currPos][0]) {
            
            var total = cost + graph[currPos][0];
            
            if(ans > total){
                ans = total;
                smallest_path = cur_path.slice();
            }
            
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
                cur_path[count] = nodes[i];
                tsp(graph, i, n, count + 1, cost + graph[currPos][i]);
                
                // Mark ith node as unvisited
                v[i] = false;
            }
        }
    }

    //OUTPUT-------------------------------------------------------------

    return {
        path: [...smallest_path, smallest_path[0]],
        totalWeight: ans 
    }

}
