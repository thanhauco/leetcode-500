// LeetCode 168 — Excel Sheet Column Title (Easy)
// Category: Math & Geometry · Approach: Base-26
// Time: O(log n) | Space: O(log n)
// Source: https://leetcode.com/problems/excel-sheet-column-title/

function convertToTitle(columnNumber: number): string {
  let res = "";
  while (columnNumber > 0) {
    columnNumber--;
    res = String.fromCharCode(65 + (columnNumber % 26)) + res;
    columnNumber = Math.floor(columnNumber / 26);
  }
  return res;
}
