// LeetCode 6 — Zigzag Conversion (Medium)
// Category: Math & Geometry · Approach: Row Simulation
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/zigzag-conversion/

function convert(s: string, numRows: number): string {
  if (numRows === 1) return s;
  const rows = new Array<string>(numRows).fill("");
  let row = 0, step = 1;
  for (const c of s) {
    rows[row] += c;
    if (row === 0) step = 1;
    else if (row === numRows - 1) step = -1;
    row += step;
  }
  return rows.join("");
}
