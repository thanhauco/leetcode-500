// LeetCode 1192 — Critical Connections in a Network (Hard)
// Category: Advanced Graphs · Approach: Tarjan Bridges
// Time: O(n + e) | Space: O(n + e)
// Source: https://leetcode.com/problems/critical-connections-in-a-network/

function criticalConnections(n: number, connections: number[][]): number[][] {
  const graph: number[][] = Array.from({ length: n }, () => []);
  for (const [a, b] of connections) { graph[a].push(b); graph[b].push(a); }
  const disc = new Array<number>(n).fill(-1);
  const low = new Array<number>(n).fill(0);
  const bridges: number[][] = [];
  let timer = 0;
  const dfs = (u: number, parent: number): void => {
    disc[u] = low[u] = timer++;
    for (const v of graph[u]) {
      if (v === parent) continue;
      if (disc[v] === -1) {
        dfs(v, u);
        low[u] = Math.min(low[u], low[v]);
        if (low[v] > disc[u]) bridges.push([Math.min(u, v), Math.max(u, v)]);
      } else {
        low[u] = Math.min(low[u], disc[v]);
      }
    }
  };
  for (let i = 0; i < n; i++) if (disc[i] === -1) dfs(i, -1);
  return bridges;
}
