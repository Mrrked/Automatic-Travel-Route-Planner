export function getRoute(graph, endPos=0, labels){
    //DECLARATION & INITIALIZATION OF NECESSARY INPUTS-----------------------------------------------

    const n = graph.length;                              //Required Input: # of nodes/locations

    //Contains the nodes/location
    // let nodes = Array(n);                   //Declare array to store nodes
    //     nodes = ['A','B','C','D'];          //Required Input: Put nodes inside the array

    //index of starting node: must be integer 
    //will be used as an counter later
    let currPos = 0;                        //Constant: Index 0 will always be the starting array. Don't change

    // let endPos = -1;                        //Required Input: Specify the index 
                                            //Set to 0 to have a circular path which goes back to the start point
                                            //Set to 1 to n, to have a linear path which ends on the selected end point
                                            //Set to -1 to have a linear path which end anywhere, selecting the optimized path
    // N x N Adj. Matrix
    // let graph = [                           //Required Input: Generate the Adjacency Matrix of the nodes
    //     [  0, 10, 15, 20 ],                 //Contains Weights of each direction.
    //     [  5,  0,  9, 10 ],
    //     [  6, 13,  0, 12 ],
    //     [  8,  8,  9,  0 ]
    // ];

    //SAMPLE 
    //A = ABDCA 35          Start-to-Start

    //B = ACDB  35          Start-to-Node
    //C = ABDC  29          Start-to-Node           Lowest
    //D = ABCD  31          Start-to-Node

    //Any = ABDC 29         Start-to-Any            
    

    //PROCESSING-------------------------------------------------------------------

    //Container of the minimum cost/weight
    //Initially set to HIGH
    let ans = 99999999999;

    //Boolean array to check if a node has been visited or not
    const v = graph.map(_ => false);

    // let new_cost = 99999999999;

    //This Array stores the path / order of nodes
    let smallest_path = [];
    let cur_path = [];

    cur_path[0] = currPos;
        
    let circular = false;                   //Linear or not 
    let any = false;

    //Mark the starting node as visited
    v[currPos] = true;
        
    if(endPos === currPos){                  //Goes Back
        circular = true;
        cur_path[n] = currPos;
    }else if(endPos < currPos){             //Anywhere
        any = true;
    }else if(endPos > currPos){             //Selected
        cur_path[n-1] = endPos;
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
        if(circular){
            if (count === n && graph[currPos][0]) {
                let total = cost + graph[currPos][0];
                if(ans > total){
                    ans = total;
                    smallest_path = cur_path.slice();
                }
                return;
            }
        }else if(any){
            if (count === n) {			            
                let total = cost;	
                if(ans > total){
                    ans = total;
                    smallest_path = cur_path.slice();
                }
                return;
            }
        }else{
            if (count === n-1 && graph[currPos][endPos]) {			            
                let total = cost + graph[currPos][endPos];	
                if(ans > total){
                    ans = total;
                    smallest_path = cur_path.slice();
                }
                return;
            }
        }
        
        
        // Loop to traverse the adjacency list
        // of currPos node and increasing the count
        // by 1 and cost by graph[currPos][i] value
        
        for (let i = 0; i < n; i++) {
            if (!v[i] && graph[currPos][i]) {
                // Mark as visited
                v[i] = true;
                cur_path[count] = i;
                tsp(graph, i, n, count + 1, cost + graph[currPos][i]);
                
                // Mark ith node as unvisited
                v[i] = false;
            }
        }
        
        
    }

    //OUTPUT-------------------------------------------------------------

    return {
        path: labels ? smallest_path.map(index => labels[index]) : smallest_path,
        total: ans
    }
}