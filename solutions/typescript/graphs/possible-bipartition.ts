// LeetCode 886 — Possible Bipartition (Medium)
// Category: Graphs · Approach: BFS coloring
// Time: O(n + E) | Space: O(n + E)
// Source: https://leetcode.com/problems/possible-bipartition/

function possibleBipartition(n: number, dislikes: number[][]): boolean {
  const adj: number[][] = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of dislikes) {
    adj[a].push(b);
    adj[b].push(a);
  }
  const color = new Array(n + 1).fill(0);
  for (let s = 1; s <= n; s++) {
    if (color[s] !== 0) continue;
    color[s] = 1;
    const queue: number[] = [s];
    while (queue.length) {
      const u = queue.shift()!;
      for (const v of adj[u]) {
        if (color[v] === 0) {
          color[v] = -color[u];
          queue.push(v);
        } else if (color[v] === color[u]) {
          return false;
        }
      }
    }
  }
  return true;
}
