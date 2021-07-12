export async function getRoute(graph, endPos=0, labels){
    const n = graph.length;
    let currPos = 0;
    let circular = false;
    let any = false;

    let ans = 99999999999;
    const v = graph.map(_ => false);
    v[currPos] = true;

    let smallest_path = [];
    let cur_path = [];
    cur_path[0] = currPos;

    if(endPos === currPos){
        circular = true;
        cur_path[n] = currPos;
    }else if(endPos < currPos){
        any = true;
    }else if(endPos > currPos){
        cur_path[n-1] = endPos;
        v[endPos] = true;
    }

    tsp(graph, currPos, n, 1, 0);

    function tsp(graph, currPos, n, count, cost){
        if(count == n){
            if(circular  && graph[currPos][0]){
                var total = cost + graph[currPos][0];
                if(ans > total){
                    ans = total;
                    smallest_path = cur_path.slice();
                }
                return;
            
            }else if(any){
                var total = cost;
                console.log(total);
                if(ans > total){
                    ans = total;
                    smallest_path = cur_path.slice();
                }
                return;
            }  
        }else if (count == n-1 && graph[currPos][endPos] && endPos > 0 ) {
            var total = cost + graph[currPos][endPos];
            console.log(total);
            if(ans > total){
                ans = total;
                smallest_path = cur_path.slice();
            }
            return;
        }

        for (let i = 0; i < n; i++) {
            if (!v[i] && graph[currPos][i]) {
                v[i] = true;
                cur_path[count] = i;
                tsp(graph, i, n, count + 1, cost + graph[currPos][i]);

                v[i] = false;
            }
        }
    }
    return {
        path: labels ? smallest_path.map(index => labels[index]) : smallest_path,
        total: ans
    }
}

export async function getRouteApprox(graph, endPos=0, labels){
    let n = graph.length;
    let currPos = 0;

    let k = (currPos < endPos) ? n - 3 : n - 2 ;

    let smallest_path = []
    let min_ans = 999999999999999;

    for(let z = 1; z < n; z++){
      if( (endPos <= currPos) || (endPos > currPos && z !== endPos) ){
        find_path(z);
      }
    }

    function find_path(start){
      let node_count = 2;
      let t_cost = 0;

      let v = Array(n).fill(false);
      v[currPos] = true;
      v[start] = true;

      if(endPos > currPos){
          v[endPos] = true;
      }

      let cur_path = []
      cur_path[currPos] = currPos;
      cur_path[1] = start;

      t_cost += graph[currPos][start];

      for(let i = 1; i <= k; i++){
          let cost = 999999;
          let index = 0;

          for(let j = 0; j < n; j++){
            if(!v[j] && cost > graph[start][j]){
              cost = graph[start][j];
              index = j;
            }
          }
          start = index;
          v[start] = true;
          t_cost += cost;
          cur_path[node_count++] = start;

          if( i === k && endPos === currPos ){
            cur_path[node_count] = 0;
            t_cost += graph[start][0];
          }else if(i === k && endPos > currPos){
            cur_path[node_count] = endPos;
            t_cost += graph[start][endPos];
          }
      }

      if(min_ans > t_cost){
          min_ans = t_cost;
          smallest_path = cur_path.slice();
      }
    }

    return {
        path: labels ? smallest_path.map(index => labels[index]) : smallest_path,
        total: min_ans
    }

}