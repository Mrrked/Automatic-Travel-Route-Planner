export default function endOnNode(graph, endPos) {
    //DECLARATION & INITIALIZATION OF NECESSARY INPUTS-----------------------------------------------

    //n is the number of nodes
    var n = graph.length;                              //4 is sample, you get input from user

    //Contains the nodes/location
    //You can use any unique indentification for every node
    var nodes = graph.map((row, index) => index);         // [...] is sample, you get input from user

    //index of starting node: must be integer 
    //will be used as an int counter later
    var currPos = 0;                        

    // N x N adjacency matrix to contain weights of each direction.
    // NOTE: 
    // var graph = [
    //     [  0, 10, 15, 20 ],
    //     [  5,  0,  9, 10 ],
    //     [  6, 13,  0, 12 ],
    //     [  8,  8,  9,  0 ]
    // ];

    //Container of the minimum cost/weight
    //Initially set to max
    var ans = 99999999999;

    // Boolean array to check if a node has been visited or not
    var v = Array(n).fill(false);

    //PROCESSING-------------------------------------------------------------------

    // var new_cost = 99999999999;

    //This Array stores the path / order of nodes
    var smallest_path = Array(n).fill('Z');
    var cur_path = Array(n).fill('Z');

    cur_path[0] = nodes[currPos];           //Declare the first node as the start element.
    cur_path[n-1] = nodes[endPos];          //NEEEEW: insert end node in the initial path

    //Mark the starting node as visited
    v[currPos] = true;
    v[endPos] = true;                       //NEEEEW: make the end node visited so it will not be used in permutation

    //Call Function
    tsp(graph, currPos, n, 1, 0);

    //This is the main RECURSIVE function
    function tsp(graph, currPos, n, count, cost){

        // If last node is reached and it has a link
        // to the starting node i.e the source then
        // keep the minimum value out of the total cost
        // of traversal and "ans"
        // Finally return to check for more possible values
        if (count === n-1 && graph[currPos][endPos]) {			//NEEEEW
            
            var total = cost + graph[currPos][endPos] + graph[endPos][0];	//NEEEEW
            
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

    // // smallest_path[] stores the sequence of nodes.
    // for(var i = 0; i < n; i++){
    //     console.log(smallest_path[i] + " -> "); 
    // }

    // // ans is the minimum weight of the path
    // console.log(ans);




    //OUTPUT-------------------------------------------------------------

    return {
        path: [...smallest_path],
        totalWeight: ans 
    }

}
