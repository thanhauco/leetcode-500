// LeetCode 695 — Max Area of Island (Medium)
// Category: Graphs · Approach: DFS
// Time: O(m·n) | Space: O(m·n)
// Source: https://leetcode.com/problems/max-area-of-island/

function maxAreaOfIsland(grid: number[][]): number {
  const rows = grid.length, cols = grid[0]?.length ?? 0;
  const dfs = (r: number, c: number): number => {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== 1) return 0;
    grid[r][c] = 0;
    return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
  };
  let best = 0;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (grid[r][c] === 1) best = Math.max(best, dfs(r, c));
  return best;
}
