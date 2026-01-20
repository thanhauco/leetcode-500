// LeetCode 435 — Non-overlapping Intervals (Medium)
// Category: Intervals · Approach: Greedy by End
// Time: O(n log n) | Space: O(1)
// Source: https://leetcode.com/problems/non-overlapping-intervals/

function eraseOverlapIntervals(intervals: number[][]): number {
  if (intervals.length === 0) return 0;
  const arr = [...intervals].sort((a, b) => a[1] - b[1]);
  let end = arr[0][1], removed = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i][0] < end) removed++;
    else end = arr[i][1];
  }
  return removed;
}
