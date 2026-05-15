// LeetCode 1102 — Path With Maximum Minimum Value (Medium)
// Category: Advanced Graphs · Approach: Dijkstra (max-min)
// Time: O(m·n log(m·n)) | Space: O(m·n)
// Source: https://leetcode.com/problems/path-with-maximum-minimum-value/

function maximumMinimumPath(grid: number[][]): number {
  const n = grid.length, m = grid[0].length;
  const seen = Array.from({ length: n }, () => new Array(m).fill(false));
  const heap: [number, number, number][] = [[grid[0][0], 0, 0]];
  const up = (i: number) => {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[i][0] > heap[p][0]) { [heap[i], heap[p]] = [heap[p], heap[i]]; i = p; } else break;
    }
  };
  const down = (i: number) => {
    for (;;) {
      let l = 2 * i + 1, r = 2 * i + 2, b = i;
      if (l < heap.length && heap[l][0] > heap[b][0]) b = l;
      if (r < heap.length && heap[r][0] > heap[b][0]) b = r;
      if (b === i) break;
      [heap[i], heap[b]] = [heap[b], heap[i]]; i = b;
    }
  };
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let ans = grid[0][0];
  while (heap.length) {
    const [v, r, c] = heap[0];
    const last = heap.pop()!;
    if (heap.length) { heap[0] = last; down(0); }
    if (seen[r][c]) continue;
    seen[r][c] = true;
    ans = Math.min(ans, v);
    if (r === n - 1 && c === m - 1) return ans;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < m && !seen[nr][nc]) {
        heap.push([grid[nr][nc], nr, nc]); up(heap.length - 1);
      }
    }
  }
  return ans;
}
