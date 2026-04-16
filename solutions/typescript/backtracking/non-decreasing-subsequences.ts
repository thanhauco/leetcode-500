// LeetCode 491 — Non-decreasing Subsequences (Medium)
// Category: Backtracking · Approach: DFS with level dedup
// Time: O(2^n · n) | Space: O(n)
// Source: https://leetcode.com/problems/non-decreasing-subsequences/

function findSubsequences(nums: number[]): number[][] {
  const res: number[][] = [];
  const path: number[] = [];
  const dfs = (start: number): void => {
    if (path.length >= 2) res.push([...path]);
    const used = new Set<number>();
    for (let i = start; i < nums.length; i++) {
      if ((path.length === 0 || nums[i] >= path[path.length - 1]) && !used.has(nums[i])) {
        used.add(nums[i]);
        path.push(nums[i]);
        dfs(i + 1);
        path.pop();
      }
    }
  };
  dfs(0);
  return res;
}
