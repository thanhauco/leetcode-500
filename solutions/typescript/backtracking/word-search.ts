// LeetCode 79 — Word Search (Medium)
// Category: Backtracking · Approach: DFS Backtracking
// Time: O(m·n·4^L) | Space: O(L)
// Source: https://leetcode.com/problems/word-search/

function exist(board: string[][], word: string): boolean {
  const rows = board.length, cols = board[0]?.length ?? 0;
  const dfs = (r: number, c: number, i: number): boolean => {
    if (i === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== word[i]) return false;
    const tmp = board[r][c];
    board[r][c] = "#";
    const found =
      dfs(r + 1, c, i + 1) || dfs(r - 1, c, i + 1) ||
      dfs(r, c + 1, i + 1) || dfs(r, c - 1, i + 1);
    board[r][c] = tmp;
    return found;
  };
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (dfs(r, c, 0)) return true;
  return false;
}
