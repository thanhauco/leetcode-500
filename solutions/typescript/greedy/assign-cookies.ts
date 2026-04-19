// LeetCode 455 — Assign Cookies (Easy)
// Category: Greedy · Approach: Two pointers
// Time: O(n log n + m log m) | Space: O(1)
// Source: https://leetcode.com/problems/assign-cookies/

function findContentChildren(g: number[], s: number[]): number {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let child = 0;
  let cookie = 0;
  while (child < g.length && cookie < s.length) {
    if (s[cookie] >= g[child]) child += 1;
    cookie += 1;
  }
  return child;
}
