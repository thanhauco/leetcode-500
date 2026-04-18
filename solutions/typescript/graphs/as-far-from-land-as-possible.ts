// LeetCode 1162 — As Far from Land as Possible (Medium)
// Category: Graphs · Approach: Multi-source BFS
// Time: O(n^2) | Space: O(n^2)
// Source: https://leetcode.com/problems/as-far-from-land-as-possible/

function maxDistance(input: number[][]): number {
  const n = input.length, m = input[0].length;
  const grid = input.map((row) => row.slice());
  const q: [number, number, number][] = [];
  for (let r = 0; r < n; r++)
    for (let c = 0; c < m; c++)
      if (grid[r][c] === 1) q.push([r, c, 0]);
  if (q.length === 0 || q.length === n * m) return -1;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let ans = 0, head = 0;
  while (head < q.length) {
    const [r, c, d] = q[head++];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] === 0) {
        grid[nr][nc] = 1;
        ans = d + 1;
        q.push([nr, nc, d + 1]);
      }
    }
  }
  return ans;
}
