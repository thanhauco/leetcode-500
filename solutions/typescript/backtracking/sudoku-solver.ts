// LeetCode 37 — Sudoku Solver (Hard)
// Category: Backtracking · Approach: Backtracking
// Time: O(9^m) | Space: O(m)
// Source: https://leetcode.com/problems/sudoku-solver/

function solveSudoku(board: string[][]): string[][] {
  const g = board.map((row) => row.slice());
  const valid = (r: number, c: number, ch: string): boolean => {
    for (let i = 0; i < 9; i++) {
      if (g[r][i] === ch || g[i][c] === ch) return false;
      const br = 3 * Math.floor(r / 3) + Math.floor(i / 3);
      const bc = 3 * Math.floor(c / 3) + (i % 3);
      if (g[br][bc] === ch) return false;
    }
    return true;
  };
  const solve = (): boolean => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (g[r][c] === ".") {
          for (let d = 1; d <= 9; d++) {
            const ch = String(d);
            if (valid(r, c, ch)) {
              g[r][c] = ch;
              if (solve()) return true;
              g[r][c] = ".";
            }
          }
          return false;
        }
      }
    }
    return true;
  };
  solve();
  return g;
}
