// LeetCode 133 — Clone Graph (Medium)
// Category: Graphs · Approach: DFS clone
// Time: O(V + E) | Space: O(V)
// Source: https://leetcode.com/problems/clone-graph/

class GraphNode {
  val: number;
  neighbors: GraphNode[] = [];
  constructor(val = 0) {
    this.val = val;
  }
}

function cloneGraph(node: GraphNode | null): GraphNode | null {
  if (node === null) return null;
  const clones = new Map<GraphNode, GraphNode>();
  const dfs = (cur: GraphNode): GraphNode => {
    const existing = clones.get(cur);
    if (existing) return existing;
    const copy = new GraphNode(cur.val);
    clones.set(cur, copy);
    for (const nb of cur.neighbors) copy.neighbors.push(dfs(nb));
    return copy;
  };
  return dfs(node);
}
