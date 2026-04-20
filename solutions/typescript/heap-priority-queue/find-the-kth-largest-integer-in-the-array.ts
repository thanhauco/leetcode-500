// LeetCode 1985 — Find the Kth Largest Integer in the Array (Medium)
// Category: Heap / Priority Queue · Approach: Length-then-lex sort
// Time: O(n log n · L) | Space: O(n)
// Source: https://leetcode.com/problems/find-the-kth-largest-integer-in-the-array/

function kthLargestNumber(nums: string[], k: number): string {
  const sorted = [...nums].sort((a, b) => {
    if (a.length !== b.length) return a.length - b.length;
    return a < b ? -1 : a > b ? 1 : 0;
  });
  return sorted[sorted.length - k];
}
