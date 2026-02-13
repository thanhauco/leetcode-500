// LeetCode 448 — Find All Numbers Disappeared in an Array (Easy)
// Category: Arrays & Hashing · Approach: Index Marking
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/

function findDisappearedNumbers(nums: number[]): number[] {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    const idx = Math.abs(nums[i]) - 1;
    if (nums[idx] > 0) nums[idx] = -nums[idx];
  }
  const res: number[] = [];
  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) res.push(i + 1);
  }
  return res;
}
