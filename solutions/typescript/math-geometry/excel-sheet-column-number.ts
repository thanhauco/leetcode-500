// LeetCode 171 — Excel Sheet Column Number (Easy)
// Category: Math & Geometry · Approach: Base-26
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/excel-sheet-column-number/

function titleToNumber(columnTitle: string): number {
  let result = 0;
  for (let i = 0; i < columnTitle.length; i++) {
    result = result * 26 + (columnTitle.charCodeAt(i) - 64);
  }
  return result;
}
