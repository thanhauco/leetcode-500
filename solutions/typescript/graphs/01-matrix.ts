// LeetCode 542 — 01 Matrix (Medium)
// Category: Graphs · Approach: Multi-Source BFS
// Time: O(rows * cols) | Space: O(rows * cols)
// Source: https://leetcode.com/problems/01-matrix/

function updateMatrix(mat: number[][]): number[][] {
  const grid = mat.map((row) => row.slice());
  const rows = grid.length;
  const cols = grid[0].length;
  const dist: number[][] = Array.from({ length: rows }, () => new Array<number>(cols).fill(-1));
  const queue: [number, number][] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 0) {
        dist[r][c] = 0;
        queue.push([r, c]);
      }
    }
  }
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let head = 0;
  while (head < queue.length) {
    const [r, c] = queue[head++];
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && dist[nr][nc] === -1) {
        dist[nr][nc] = dist[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }
  return dist;
}
