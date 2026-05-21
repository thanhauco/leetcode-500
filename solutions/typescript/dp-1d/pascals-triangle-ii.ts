// LeetCode 119 — Pascal's Triangle II (Easy)
// Category: 1-D Dynamic Programming · Approach: Rolling Row
// Time: O(rowIndex^2) | Space: O(rowIndex)
// Source: https://leetcode.com/problems/pascals-triangle-ii/

function getRow(rowIndex: number): number[] {
  let row = [1];
  for (let k = 0; k < rowIndex; k++) {
    const next = new Array<number>(row.length + 1);
    for (let i = 0; i <= row.length; i++) {
      const left = i > 0 ? row[i - 1] : 0;
      const right = i < row.length ? row[i] : 0;
      next[i] = left + right;
    }
    row = next;
  }
  return row;
}
