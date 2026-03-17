// LeetCode 51 — N-Queens (Hard)
// Category: Backtracking · Approach: Backtracking
// Time: O(n!) | Space: O(n^2)
// Source: https://leetcode.com/problems/n-queens/

function solveNQueens(n: number): string[][] {
  const res: string[][] = [];
  const cols = new Set<number>();
  const diag = new Set<number>();
  const anti = new Set<number>();
  const board: string[][] = Array.from({ length: n }, () => Array(n).fill("."));
  const place = (r: number): void => {
    if (r === n) {
      res.push(board.map((row) => row.join("")));
      return;
    }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag.has(r - c) || anti.has(r + c)) continue;
      cols.add(c); diag.add(r - c); anti.add(r + c);
      board[r][c] = "Q";
      place(r + 1);
      board[r][c] = ".";
      cols.delete(c); diag.delete(r - c); anti.delete(r + c);
    }
  };
  place(0);
  return res;
}
