// LeetCode 986 — Interval List Intersections (Medium)
// Category: Intervals · Approach: Two pointers
// Time: O(m + n) | Space: O(1)
// Source: https://leetcode.com/problems/interval-list-intersections/

function intervalIntersection(first: number[][], second: number[][]): number[][] {
  const res: number[][] = [];
  let i = 0;
  let j = 0;
  while (i < first.length && j < second.length) {
    const lo = Math.max(first[i][0], second[j][0]);
    const hi = Math.min(first[i][1], second[j][1]);
    if (lo <= hi) res.push([lo, hi]);
    if (first[i][1] < second[j][1]) i += 1;
    else j += 1;
  }
  return res;
}
