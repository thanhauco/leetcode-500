// LeetCode 1 — Two Sum (Easy)
// Category: Arrays & Hashing · Approach: Hash Map
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/two-sum/

function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need)!, i];
    seen.set(nums[i], i);
  }
  return [];
}
