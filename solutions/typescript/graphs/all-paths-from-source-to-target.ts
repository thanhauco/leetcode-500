// LeetCode 797 — All Paths From Source to Target (Medium)
// Category: Graphs · Approach: DFS Backtracking
// Time: O(2^n * n) | Space: O(n)
// Source: https://leetcode.com/problems/all-paths-from-source-to-target/

function allPathsSourceTarget(graph: number[][]): number[][] {
  const target = graph.length - 1;
  const res: number[][] = [];
  const dfs = (node: number, path: number[]): void => {
    if (node === target) {
      res.push([...path]);
      return;
    }
    for (const nxt of graph[node]) {
      path.push(nxt);
      dfs(nxt, path);
      path.pop();
    }
  };
  dfs(0, [0]);
  return res;
}
