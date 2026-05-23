// LeetCode 1791 — Find Center of Star Graph (Easy)
// Category: Graphs · Approach: Two-Edge Check
// Time: O(1) | Space: O(1)
// Source: https://leetcode.com/problems/find-center-of-star-graph/

function findCenter(edges: number[][]): number {
  const [a, b] = edges[0];
  const [c, d] = edges[1];
  return a === c || a === d ? a : b;
}
