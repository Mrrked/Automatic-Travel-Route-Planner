$(document).ready(function (){
    
    //DECLARATION & INITIALIZATION OF NECESSARY INPUTS-----------------------------------------------
    
    var n = 5;                              //Required Input: # of nodes/locations
    
    //Contains the nodes/location
    var nodes = Array(n);                   //Declare array to store nodes
        nodes = ['0','1','2','3','4'];          //Required Input: Put nodes inside the array
    
    //index of starting node: must be integer
    //will be used as an counter later
    var currPos = 0;                        //Constant: Index 0 will always be the starting array. Don't change
    
    var endPos = 0;                        //Required Input: Specify the index
                                            //Set to 0 to have a circular path which goes back to the start point
                                            //Set to 1 to n, to have a linear path which ends on the selected end point
                                            //Set to -1 to have a linear path which end anywhere, selecting the optimized path
    // N x N Adj. Matrix
    var graph = [                           //Required Input: Generate the Adjacency Matrix of the nodes
        [    0, 1.08, 6.03, 3.87, 1.62],                //Contains Weight of each direction.
        [ 0.22,    0, 4.92, 3.43, 1.35],
        [  5.2,    5,    0,  5.1,  5.3],
        [  4.1,  3.3,  4.6,    0,  2.2],
        [  1.7,  1.4,  5.1,  2.8,    0]
    ];
    
    
    
    //PROCESSING-------------------------------------------------------------------
    
    //Container of the minimum cost/weight
    //Initially set to HIGH
    var ans = 99999999999;
    
    //Boolean array to check if a node has been visited or not
    var v = Array(n).fill(false);
    
    var new_cost = 99999999999;
    
    //This Array stores the path / order of nodes
    var smallest_path = Array((n+1)).fill('?');
    var cur_path = Array((n+1)).fill('?');
    
    cur_path[0] = nodes[currPos];
    
    var circular = false;                   //Linear or not
    var any = false;
    
    //Mark the starting node as visited
    v[currPos] = true;
    
    if(endPos == currPos){                  //Goes Back
        circular = true;
        cur_path[n] = nodes[currPos];
    }else if(endPos < currPos){             //Anywhere
        any = true;
    }else if(endPos > currPos){             //Selected
        cur_path[n-1] = nodes[endPos];
        v[endPos] = true;
    }
    
    //Call Function
    tsp(graph, currPos, n, 1, 0);
    
    //This is the main RECURSIVE function
    function tsp(graph, currPos, n, count, cost){
        // If last node is reached and it has a link
        // to the starting node i.e the source then
        // keep the minimum value out of the total cost
        // of traversal and "ans"
        // Finally return to check for more possible values
        
        if(count == n){
            if(circular  && graph[currPos][0]){
                var total = cost + graph[currPos][0];
                console.log(cur_path[0] + cur_path[1] + cur_path[2] + cur_path[3] + cur_path[4] + cur_path[5] + " --> " + total);
                if(ans > total){
                    ans = total;
                    smallest_path = cur_path.slice();
                    console.log("Smaller")
                }
                return;
            
            }else if(any){
                var total = cost;
                console.log(cur_path[0] + cur_path[1] + cur_path[2] + cur_path[3] + cur_path[4] + cur_path[5] + " --> " + total);            
                if(ans > total){
                    ans = total;
                    smallest_path = cur_path.slice();
                    console.log("Smaller")
                }
                return;
            }  
        }else if (count == n-1 && graph[currPos][endPos] && endPos > 0) {
            var total = cost + graph[currPos][endPos];
            console.log(cur_path[0] + cur_path[1] + cur_path[2] + cur_path[3] + cur_path[4] + cur_path[5] + " --> " + total);
            if(ans > total){
                ans = total;
                smallest_path = cur_path.slice();
                console.log("Smaller")
            }
            return;
        }
    
    
        // Loop to traverse the adjacency list
        // of currPos node and increasing the count
        // by 1 and cost by graph[currPos][i] value
    
        //Permutation
    
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
    
    //smallest_path[] stores the sequence of nodes.
     console.log("OUTPUT: " + smallest_path[0] + smallest_path[1] + smallest_path[2] + smallest_path[3] + smallest_path[4] + smallest_path[5] + " --> " + ans);
     
    });