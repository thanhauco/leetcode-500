// LeetCode 56 — Merge Intervals (Medium)
// Category: Intervals · Approach: Sort + Merge
// Time: O(n log n) | Space: O(n)
// Source: https://leetcode.com/problems/merge-intervals/

function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged: number[][] = [];
  for (const [start, end] of intervals) {
    const last = merged[merged.length - 1];
    if (last && start <= last[1]) last[1] = Math.max(last[1], end);
    else merged.push([start, end]);
  }
  return merged;
}
