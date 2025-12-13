// LeetCode 704 — Binary Search (Easy)
// Category: Binary Search · Approach: Iterative
// Time: O(log n) | Space: O(1)
// Source: https://leetcode.com/problems/binary-search/

function search(nums: number[], target: number): number {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
