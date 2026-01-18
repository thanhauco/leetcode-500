// LeetCode 994 — Rotting Oranges (Medium)
// Category: Graphs · Approach: Multi-source BFS
// Time: O(m·n) | Space: O(m·n)
// Source: https://leetcode.com/problems/rotting-oranges/

function orangesRotting(grid: number[][]): number {
  const rows = grid.length, cols = grid[0]?.length ?? 0;
  const queue: [number, number][] = [];
  let fresh = 0;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) queue.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
    }
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let minutes = 0;
  while (queue.length && fresh > 0) {
    minutes++;
    const size = queue.length;
    for (let k = 0; k < size; k++) {
      const [r, c] = queue.shift()!;
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || grid[nr][nc] !== 1) continue;
        grid[nr][nc] = 2;
        fresh--;
        queue.push([nr, nc]);
      }
    }
  }
  return fresh === 0 ? minutes : -1;
}
