// LeetCode 417 — Pacific Atlantic Water Flow (Medium)
// Category: Graphs · Approach: Reverse DFS
// Time: O(m·n) | Space: O(m·n)
// Source: https://leetcode.com/problems/pacific-atlantic-water-flow/

function pacificAtlantic(heights: number[][]): number[][] {
  const rows = heights.length, cols = heights[0]?.length ?? 0;
  if (!rows || !cols) return [];
  const pac = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const atl = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const dfs = (r: number, c: number, seen: boolean[][], prev: number): void => {
    if (r < 0 || r >= rows || c < 0 || c >= cols || seen[r][c] || heights[r][c] < prev) return;
    seen[r][c] = true;
    const h = heights[r][c];
    dfs(r + 1, c, seen, h); dfs(r - 1, c, seen, h);
    dfs(r, c + 1, seen, h); dfs(r, c - 1, seen, h);
  };
  for (let c = 0; c < cols; c++) {
    dfs(0, c, pac, heights[0][c]);
    dfs(rows - 1, c, atl, heights[rows - 1][c]);
  }
  for (let r = 0; r < rows; r++) {
    dfs(r, 0, pac, heights[r][0]);
    dfs(r, cols - 1, atl, heights[r][cols - 1]);
  }
  const res: number[][] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (pac[r][c] && atl[r][c]) res.push([r, c]);
  return res;
}
