// LeetCode 118 — Pascal's Triangle (Easy)
// Category: 2-D Dynamic Programming · Approach: Row by Row
// Time: O(numRows^2) | Space: O(numRows^2)
// Source: https://leetcode.com/problems/pascals-triangle/

function generate(numRows: number): number[][] {
  const rows: number[][] = [];
  for (let r = 0; r < numRows; r++) {
    const row = new Array<number>(r + 1).fill(1);
    for (let c = 1; c < r; c++) row[c] = rows[r - 1][c - 1] + rows[r - 1][c];
    rows.push(row);
  }
  return rows;
}
