// LeetCode 16 — 3Sum Closest (Medium)
// Category: Two Pointers · Approach: Sort + Two Pointers
// Time: O(n^2) | Space: O(1)
// Source: https://leetcode.com/problems/3sum-closest/

function threeSumClosest(nums: number[], target: number): number {
  nums.sort((a, b) => a - b);
  let best = nums[0] + nums[1] + nums[2];
  for (let i = 0; i < nums.length - 2; i++) {
    let l = i + 1;
    let r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (Math.abs(sum - target) < Math.abs(best - target)) best = sum;
      if (sum === target) return sum;
      if (sum < target) l++;
      else r--;
    }
  }
  return best;
}
