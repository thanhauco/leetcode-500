// LeetCode 212 — Word Search II (Hard)
// Category: Tries · Approach: Trie + backtracking
// Time: O(m·n·4^L) | Space: O(total chars)
// Source: https://leetcode.com/problems/word-search-ii/

function findWords(board: string[][], words: string[]): string[] {
  const trie: Record<string, any> = {};
  for (const w of words) {
    let node = trie;
    for (const ch of w) node = node[ch] ??= {};
    node.$ = w;
  }
  const rows = board.length, cols = board[0].length;
  const found: string[] = [];
  const dfs = (r: number, c: number, node: Record<string, any>): void => {
    const ch = board[r][c];
    const next = node[ch];
    if (next === undefined) return;
    if (typeof next.$ === "string") {
      found.push(next.$);
      delete next.$;
    }
    board[r][c] = "#";
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] !== "#") dfs(nr, nc, next);
    }
    board[r][c] = ch;
  };
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) dfs(r, c, trie);
  return found;
}
