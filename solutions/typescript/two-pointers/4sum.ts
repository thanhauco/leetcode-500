// LeetCode 18 — 4Sum (Medium)
// Category: Two Pointers · Approach: Sort + Two Pointers
// Time: O(n^3) | Space: O(1)
// Source: https://leetcode.com/problems/4sum/

function fourSum(nums: number[], target: number): number[][] {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const res: number[][] = [];
  for (let i = 0; i < n - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    for (let j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      let l = j + 1;
      let r = n - 1;
      while (l < r) {
        const sum = nums[i] + nums[j] + nums[l] + nums[r];
        if (sum === target) {
          res.push([nums[i], nums[j], nums[l], nums[r]]);
          while (l < r && nums[l] === nums[l + 1]) l++;
          while (l < r && nums[r] === nums[r - 1]) r--;
          l++;
          r--;
        } else if (sum < target) {
          l++;
        } else {
          r--;
        }
      }
    }
  }
  return res;
}
