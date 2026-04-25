// LeetCode 863 — All Nodes Distance K in Binary Tree (Medium)
// Category: Trees · Approach: Parent map + BFS
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function distanceK(root: TreeNode | null, target: number, k: number): number[] {
  const parent = new Map<TreeNode, TreeNode | null>();
  let targetNode: TreeNode | null = null;
  const dfs = (node: TreeNode | null, par: TreeNode | null) => {
    if (!node) return;
    parent.set(node, par);
    if (node.val === target) targetNode = node;
    dfs(node.left, node);
    dfs(node.right, node);
  };
  dfs(root, null);
  if (!targetNode) return [];
  const seen = new Set<TreeNode>([targetNode]);
  let frontier: TreeNode[] = [targetNode];
  let dist = 0;
  while (frontier.length && dist < k) {
    const next: TreeNode[] = [];
    for (const node of frontier) {
      for (const nb of [node.left, node.right, parent.get(node)!]) {
        if (nb && !seen.has(nb)) {
          seen.add(nb);
          next.push(nb);
        }
      }
    }
    frontier = next;
    dist++;
  }
  return dist === k ? frontier.map((n) => n.val) : [];
}
