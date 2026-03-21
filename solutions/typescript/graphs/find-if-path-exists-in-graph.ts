// LeetCode 1971 — Find if Path Exists in Graph (Easy)
// Category: Graphs · Approach: Union-Find
// Time: O((V + E) * α(V)) | Space: O(V)
// Source: https://leetcode.com/problems/find-if-path-exists-in-graph/

function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x: number): number => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  for (const [a, b] of edges) parent[find(a)] = find(b);
  return find(source) === find(destination);
}
