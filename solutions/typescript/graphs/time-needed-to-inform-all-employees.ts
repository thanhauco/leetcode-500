// LeetCode 1376 — Time Needed to Inform All Employees (Medium)
// Category: Graphs · Approach: DFS
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/time-needed-to-inform-all-employees/

function numOfMinutes(n: number, headID: number, manager: number[], informTime: number[]): number {
  const children: number[][] = Array.from({ length: n }, () => []);
  for (let i = 0; i < n; i++) {
    if (manager[i] !== -1) children[manager[i]].push(i);
  }
  const dfs = (u: number): number => {
    let best = 0;
    for (const c of children[u]) best = Math.max(best, dfs(c));
    return informTime[u] + best;
  };
  return dfs(headID);
}
