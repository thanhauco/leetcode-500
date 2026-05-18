// LeetCode 287 — Find the Duplicate Number (Medium)
// Category: Binary Search · Approach: Binary Search on Value
// Time: O(n log n) | Space: O(1)
// Source: https://leetcode.com/problems/find-the-duplicate-number/

function findDuplicate(nums: number[]): number {
  let lo = 1, hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    let count = 0;
    for (const x of nums) if (x <= mid) count++;
    if (count > mid) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
