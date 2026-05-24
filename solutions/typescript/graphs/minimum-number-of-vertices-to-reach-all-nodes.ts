// LeetCode 1557 — Minimum Number of Vertices to Reach All Nodes (Medium)
// Category: Graphs · Approach: In-degree
// Time: O(n + e) | Space: O(n)
// Source: https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/

function findSmallestSetOfVertices(n: number, edges: number[][]): number[] {
  const indeg = new Array(n).fill(0);
  for (const [, v] of edges) indeg[v]++;
  const res: number[] = [];
  for (let i = 0; i < n; i++) if (indeg[i] === 0) res.push(i);
  return res;
}
