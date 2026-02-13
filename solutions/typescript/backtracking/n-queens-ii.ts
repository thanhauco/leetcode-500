// LeetCode 52 — N-Queens II (Hard)
// Category: Backtracking · Approach: Backtracking
// Time: O(n!) | Space: O(n)
// Source: https://leetcode.com/problems/n-queens-ii/

function totalNQueens(n: number): number {
  const cols = new Set<number>();
  const diag1 = new Set<number>();
  const diag2 = new Set<number>();
  let count = 0;
  function bt(row: number): void {
    if (row === n) {
      count++;
      return;
    }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag1.has(row - c) || diag2.has(row + c)) continue;
      cols.add(c);
      diag1.add(row - c);
      diag2.add(row + c);
      bt(row + 1);
      cols.delete(c);
      diag1.delete(row - c);
      diag2.delete(row + c);
    }
  }
  bt(0);
  return count;
}
