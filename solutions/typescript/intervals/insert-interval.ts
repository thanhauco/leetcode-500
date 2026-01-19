// LeetCode 57 — Insert Interval (Medium)
// Category: Intervals · Approach: Three-phase sweep
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/insert-interval/

function insert(intervals: number[][], newInterval: number[]): number[][] {
  const res: number[][] = [];
  let [ns, ne] = newInterval;
  let i = 0;
  const n = intervals.length;
  while (i < n && intervals[i][1] < ns) res.push(intervals[i++]);
  while (i < n && intervals[i][0] <= ne) {
    ns = Math.min(ns, intervals[i][0]);
    ne = Math.max(ne, intervals[i][1]);
    i++;
  }
  res.push([ns, ne]);
  while (i < n) res.push(intervals[i++]);
  return res;
}
