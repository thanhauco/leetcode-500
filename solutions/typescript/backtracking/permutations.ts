// LeetCode 46 — Permutations (Medium)
// Category: Backtracking · Approach: Backtracking
// Time: O(n·n!) | Space: O(n)
// Source: https://leetcode.com/problems/permutations/

function permute(nums: number[]): number[][] {
  const res: number[][] = [];
  const used = new Array(nums.length).fill(false);
  const path: number[] = [];
  const dfs = (): void => {
    if (path.length === nums.length) { res.push([...path]); return; }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      dfs();
      path.pop();
      used[i] = false;
    }
  };
  dfs();
  return res;
}
