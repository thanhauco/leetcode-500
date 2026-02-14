// LeetCode 47 — Permutations II (Medium)
// Category: Backtracking · Approach: Backtracking
// Time: O(n · n!) | Space: O(n)
// Source: https://leetcode.com/problems/permutations-ii/

function permuteUnique(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  const path: number[] = [];
  const used = new Array(nums.length).fill(false);
  function bt(): void {
    if (path.length === nums.length) {
      res.push(path.slice());
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;
      used[i] = true;
      path.push(nums[i]);
      bt();
      path.pop();
      used[i] = false;
    }
  }
  bt();
  return res;
}
