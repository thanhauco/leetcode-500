// LeetCode 300 — Longest Increasing Subsequence (Medium)
// Category: 1-D Dynamic Programming · Approach: Patience + Binary Search
// Time: O(n log n) | Space: O(n)
// Source: https://leetcode.com/problems/longest-increasing-subsequence/

function lengthOfLIS(nums: number[]): number {
  const tails: number[] = [];
  for (const x of nums) {
    let lo = 0, hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = x;
  }
  return tails.length;
}
