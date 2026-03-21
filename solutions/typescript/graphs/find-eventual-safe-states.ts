// LeetCode 802 — Find Eventual Safe States (Medium)
// Category: Graphs · Approach: DFS Coloring
// Time: O(V + E) | Space: O(V + E)
// Source: https://leetcode.com/problems/find-eventual-safe-states/

function eventualSafeNodes(graph: number[][]): number[] {
  const n = graph.length;
  const color = new Array<number>(n).fill(0); // 0 unvisited, 1 visiting, 2 safe
  const safe = (u: number): boolean => {
    if (color[u] !== 0) return color[u] === 2;
    color[u] = 1;
    for (const v of graph[u]) if (!safe(v)) return false;
    color[u] = 2;
    return true;
  };
  const res: number[] = [];
  for (let i = 0; i < n; i++) if (safe(i)) res.push(i);
  return res;
}
