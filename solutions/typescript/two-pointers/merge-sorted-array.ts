// LeetCode 88 — Merge Sorted Array (Easy)
// Category: Two Pointers · Approach: Merge
// Time: O(m + n) | Space: O(m + n)
// Source: https://leetcode.com/problems/merge-sorted-array/

function merge(nums1: number[], m: number, nums2: number[], n: number): number[] {
  const a = nums1.slice(0, m), b = nums2.slice(0, n);
  const result: number[] = [];
  let i = 0, j = 0;
  while (i < m && j < n) {
    if (a[i] <= b[j]) result.push(a[i++]);
    else result.push(b[j++]);
  }
  while (i < m) result.push(a[i++]);
  while (j < n) result.push(b[j++]);
  return result;
}
