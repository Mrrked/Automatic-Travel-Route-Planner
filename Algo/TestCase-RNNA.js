$(document).ready(function (){
    
    //DECLARATION & INITIALIZATION OF NECESSARY INPUTS-----------------------------------------------
    
    var n = 5;                              //Required Input: # of nodes/locations
    
    //Contains the nodes/location
    var nodes = Array(n);                   //Declare array to store nodes
        nodes = ['0','1','2','3','4'];          //Required Input: Put nodes inside the array
    
    //index of starting node: must be integer
    //will be used as an counter later
    var currPos = 0;                        //Constant: Index 0 will always be the starting array. Don't change
    
    var endPos = 0;                         //Required Input: Specify the index
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

    var k = (currPos < endPos) ? n - 3 : n - 2 ;

    //Stores the Final cost and path
    var smallest_path = Array((n+1)).fill('?');
    var min_ans = 999999999999999;

    for( z = 1; z < n; z++){
        if( (endPos <= currPos) || (endPos > currPos && z !== endPos) ){
            find_path(z);
        }
    }

    function find_path(start){
    var node_count = 2;
    var t_cost = 0;

    var v = Array(n).fill(false);
    v[currPos] = true;
    v[start] = true;

    if(endPos > currPos){
        v[endPos] = true;
    }

    var cur_path = Array((n+1)).fill('?');
    cur_path[currPos] = nodes[currPos];
    cur_path[1] = nodes[start];

    t_cost += graph[currPos][start];

    for(var i = 1; i <= k; i++){                      //Create path based on the nearest node.

        cost = 999999;
        index = 0;

        for(var j = 0; j < n; j++){                    //Find lowest cost node among the available nodes
            if(!v[j] && cost > graph[start][j]){
                cost = graph[start][j];
                index = j;
            }
        }
        start = index;
        v[start] = true;
        t_cost += cost;
        cur_path[node_count++] = nodes[start];

        if( i == k && endPos == currPos ){
            cur_path[node_count] = nodes[0];
            t_cost += graph[start][0];
        }else if(i == k && endPos > currPos){
            cur_path[node_count] = nodes[endPos];
            t_cost += graph[start][endPos];
        }
    }
    console.log( cur_path[0] + cur_path[1] + cur_path[2] + cur_path[3] + cur_path[4] + cur_path[5] + " --> " + t_cost);
    if(min_ans > t_cost){
        min_ans = t_cost;
        smallest_path = cur_path.slice();
        console.log("Smaller");
    }


    }

    //OUTPUT

    //smallest_path[] stores the sequence of nodes.
    console.log("OUTPUT: " + smallest_path[0] + smallest_path[1] + smallest_path[2] + smallest_path[3] + smallest_path[4] + smallest_path[5] + " --> " + min_ans);
        

});