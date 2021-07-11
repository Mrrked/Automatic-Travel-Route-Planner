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
