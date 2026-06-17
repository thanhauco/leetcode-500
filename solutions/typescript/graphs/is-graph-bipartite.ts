// LeetCode 785 — Is Graph Bipartite? (Medium)
// Category: Graphs · Approach: BFS coloring
// Time: O(V + E) | Space: O(V)
// Source: https://leetcode.com/problems/is-graph-bipartite/

function isBipartite(graph: number[][]): boolean {
  const color = new Array(graph.length).fill(0);
  for (let s = 0; s < graph.length; s++) {
    if (color[s] !== 0) continue;
    color[s] = 1;
    const queue: number[] = [s];
    while (queue.length) {
      const u = queue.shift()!;
      for (const v of graph[u]) {
        if (color[v] === 0) {
          color[v] = -color[u];
          queue.push(v);
        } else if (color[v] === color[u]) {
          return false;
        }
      }
    }
  }
  return true;
}
