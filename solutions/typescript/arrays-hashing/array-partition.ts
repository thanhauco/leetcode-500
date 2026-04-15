// LeetCode 561 — Array Partition (Easy)
// Category: Arrays & Hashing · Approach: Sort + Greedy
// Time: O(n log n) | Space: O(1)
// Source: https://leetcode.com/problems/array-partition/

function arrayPairSum(nums: number[]): number {
  nums.sort((a, b) => a - b);
  let total = 0;
  for (let i = 0; i < nums.length; i += 2) total += nums[i];
  return total;
}
