// LeetCode 442 — Find All Duplicates in an Array (Medium)
// Category: Arrays & Hashing · Approach: Index Marking
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/find-all-duplicates-in-an-array/

function findDuplicates(nums: number[]): number[] {
  const res: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    const idx = Math.abs(nums[i]) - 1;
    if (nums[idx] < 0) res.push(idx + 1);
    else nums[idx] = -nums[idx];
  }
  return res;
}
