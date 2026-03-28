// LeetCode 31 — Next Permutation (Medium)
// Category: Two Pointers · Approach: Pivot + Reverse
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/next-permutation/

function nextPermutation(nums: number[]): number[] {
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) i--;
  if (i >= 0) {
    let j = nums.length - 1;
    while (nums[j] <= nums[i]) j--;
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  let l = i + 1;
  let r = nums.length - 1;
  while (l < r) {
    [nums[l], nums[r]] = [nums[r], nums[l]];
    l++;
    r--;
  }
  return nums;
}
