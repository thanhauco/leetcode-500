// LeetCode 452 — Minimum Number of Arrows to Burst Balloons (Medium)
// Category: Intervals · Approach: Greedy by end
// Time: O(n log n) | Space: O(1)
// Source: https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/

function findMinArrowShots(points: number[][]): number {
  if (points.length === 0) return 0;
  points.sort((a, b) => a[1] - b[1]);
  let arrows = 0;
  let last = -Infinity;
  for (const [start, end] of points) {
    if (start > last) {
      arrows += 1;
      last = end;
    }
  }
  return arrows;
}
