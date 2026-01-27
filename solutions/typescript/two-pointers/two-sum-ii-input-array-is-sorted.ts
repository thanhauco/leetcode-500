// LeetCode 167 — Two Sum II - Input Array Is Sorted (Medium)
// Category: Two Pointers · Approach: Two Pointers
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/

function twoSum(numbers: number[], target: number): number[] {
  let left = 0, right = numbers.length - 1;
  while (left < right) {
    const total = numbers[left] + numbers[right];
    if (total === target) return [left + 1, right + 1];
    if (total < target) left++;
    else right--;
  }
  return [];
}
