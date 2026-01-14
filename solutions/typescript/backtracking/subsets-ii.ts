// LeetCode 90 — Subsets II (Medium)
// Category: Backtracking · Approach: Backtracking
// Time: O(n·2^n) | Space: O(n)
// Source: https://leetcode.com/problems/subsets-ii/

function subsetsWithDup(nums: number[]): number[][] {
  const arr = [...nums].sort((a, b) => a - b);
  const res: number[][] = [];
  const path: number[] = [];
  const dfs = (start: number): void => {
    res.push([...path]);
    for (let i = start; i < arr.length; i++) {
      if (i > start && arr[i] === arr[i - 1]) continue;
      path.push(arr[i]);
      dfs(i + 1);
      path.pop();
    }
  };
  dfs(0);
  return res;
}
