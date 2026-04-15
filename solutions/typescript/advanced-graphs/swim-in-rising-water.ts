// LeetCode 778 — Swim in Rising Water (Hard)
// Category: Advanced Graphs · Approach: Dijkstra
// Time: O(n^2 log n) | Space: O(n^2)
// Source: https://leetcode.com/problems/swim-in-rising-water/

function swimInWater(grid: number[][]): number {
  const n = grid.length;
  const seen = Array.from({ length: n }, () => new Array<boolean>(n).fill(false));
  const heap: [number, number, number][] = [[grid[0][0], 0, 0]];
  const up = (i: number) => {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p][0] <= heap[i][0]) break;
      [heap[p], heap[i]] = [heap[i], heap[p]]; i = p;
    }
  };
  const down = () => {
    let i = 0;
    for (;;) {
      let s = i; const l = 2 * i + 1, r = 2 * i + 2;
      if (l < heap.length && heap[l][0] < heap[s][0]) s = l;
      if (r < heap.length && heap[r][0] < heap[s][0]) s = r;
      if (s === i) break;
      [heap[s], heap[i]] = [heap[i], heap[s]]; i = s;
    }
  };
  seen[0][0] = true;
  let ans = 0;
  while (heap.length) {
    const top = heap[0];
    const last = heap.pop()!;
    if (heap.length) { heap[0] = last; down(); }
    const [t, r, c] = top;
    ans = Math.max(ans, t);
    if (r === n - 1 && c === n - 1) return ans;
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n && !seen[nr][nc]) {
        seen[nr][nc] = true;
        heap.push([grid[nr][nc], nr, nc]); up(heap.length - 1);
      }
    }
  }
  return ans;
}
