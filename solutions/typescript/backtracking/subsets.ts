// LeetCode 78 — Subsets (Medium)
// Category: Backtracking · Approach: Backtracking
// Time: O(n·2^n) | Space: O(n)
// Source: https://leetcode.com/problems/subsets/

function subsets(nums: number[]): number[][] {
  const res: number[][] = [];
  const path: number[] = [];
  const backtrack = (start: number): void => {
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1);
      path.pop();
    }
  };
  backtrack(0);
  return res;
}
