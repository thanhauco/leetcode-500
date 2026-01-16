// LeetCode 268 — Missing Number (Easy)
// Category: Bit Manipulation · Approach: XOR
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/missing-number/

function missingNumber(nums: number[]): number {
  let missing = nums.length;
  for (let i = 0; i < nums.length; i++) {
    missing ^= i ^ nums[i];
  }
  return missing;
}
