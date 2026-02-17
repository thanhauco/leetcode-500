// LeetCode 130 — Surrounded Regions (Medium)
// Category: Graphs · Approach: Border DFS
// Time: O(m·n) | Space: O(m·n)
// Source: https://leetcode.com/problems/surrounded-regions/

function solve(board: string[][]): string[][] {
  const rows = board.length, cols = board[0]?.length ?? 0;
  const mark = (r: number, c: number): void => {
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== "O") return;
    board[r][c] = "S";
    mark(r + 1, c); mark(r - 1, c); mark(r, c + 1); mark(r, c - 1);
  };
  for (let r = 0; r < rows; r++) { mark(r, 0); mark(r, cols - 1); }
  for (let c = 0; c < cols; c++) { mark(0, c); mark(rows - 1, c); }
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      board[r][c] = board[r][c] === "S" ? "O" : "X";
  return board;
}
