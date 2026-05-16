// LeetCode 1514 — Path with Maximum Probability (Medium)
// Category: Advanced Graphs · Approach: Dijkstra (max-heap)
// Time: O((n + e) log n) | Space: O(n + e)
// Source: https://leetcode.com/problems/path-with-maximum-probability/

function maxProbability(n: number, edges: number[][], succProb: number[], start: number, end: number): number {
  const adj: [number, number][][] = Array.from({ length: n }, () => []);
  for (let i = 0; i < edges.length; i++) {
    const [u, v] = edges[i];
    adj[u].push([v, succProb[i]]);
    adj[v].push([u, succProb[i]]);
  }
  const best = new Array(n).fill(0);
  best[start] = 1;
  // Simple array-backed max-heap by probability.
  const heap: [number, number][] = [[1, start]];
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
  while (heap.length) {
    const [p, node] = heap[0];
    const last = heap.pop()!;
    if (heap.length) { heap[0] = last; down(0); }
    if (node === end) return p;
    if (p < best[node]) continue;
    for (const [nb, ep] of adj[node]) {
      const np = p * ep;
      if (np > best[nb]) { best[nb] = np; heap.push([np, nb]); up(heap.length - 1); }
    }
  }
  return 0;
}
