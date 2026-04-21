// LeetCode 1288 — Remove Covered Intervals (Medium)
// Category: Intervals · Approach: Sort + sweep
// Time: O(n log n) | Space: O(1)
// Source: https://leetcode.com/problems/remove-covered-intervals/

function removeCoveredIntervals(intervals: number[][]): number {
  intervals.sort((a, b) => (a[0] - b[0]) || (b[1] - a[1]));
  let count = 0;
  let prevEnd = 0;
  for (const [, end] of intervals) {
    if (end > prevEnd) {
      count += 1;
      prevEnd = end;
    }
  }
  return count;
}
