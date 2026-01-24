// LeetCode 102 — Binary Tree Level Order Traversal (Medium)
// Category: Trees · Approach: BFS by level
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/binary-tree-level-order-traversal/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const res: number[][] = [];
  let queue: TreeNode[] = [root];
  while (queue.length) {
    const level: number[] = [];
    const next: TreeNode[] = [];
    for (const node of queue) {
      level.push(node.val);
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    res.push(level);
    queue = next;
  }
  return res;
}
