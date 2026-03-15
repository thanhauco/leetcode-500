// LeetCode 1631 — Path With Minimum Effort (Medium)
// Category: Advanced Graphs · Approach: Dijkstra
// Time: O(R * C * log(R * C)) | Space: O(R * C)
// Source: https://leetcode.com/problems/path-with-minimum-effort/

function minimumEffortPath(heights: number[][]): number {
  const rows = heights.length;
  const cols = heights[0].length;
  const effort: number[][] = Array.from({ length: rows }, () => new Array<number>(cols).fill(Infinity));
  effort[0][0] = 0;
  const heap: [number, number, number][] = [[0, 0, 0]];
  const swap = (i: number, j: number): void => { const t = heap[i]; heap[i] = heap[j]; heap[j] = t; };
  const push = (item: [number, number, number]): void => {
    heap.push(item);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p][0] <= heap[i][0]) break;
      swap(p, i); i = p;
    }
  };
  const pop = (): [number, number, number] => {
    const top = heap[0];
    const last = heap.pop()!;
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      for (;;) {
        let s = i;
        const l = 2 * i + 1, r = 2 * i + 2;
        if (l < heap.length && heap[l][0] < heap[s][0]) s = l;
        if (r < heap.length && heap[r][0] < heap[s][0]) s = r;
        if (s === i) break;
        swap(s, i); i = s;
      }
    }
    return top;
  };
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (heap.length) {
    const [e, r, c] = pop();
    if (r === rows - 1 && c === cols - 1) return e;
    if (e > effort[r][c]) continue;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      const ne = Math.max(e, Math.abs(heights[nr][nc] - heights[r][c]));
      if (ne < effort[nr][nc]) {
        effort[nr][nc] = ne;
        push([ne, nr, nc]);
      }
    }
  }
  return 0;
}
