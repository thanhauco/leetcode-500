// LeetCode 222 — Count Complete Tree Nodes (Easy)
// Category: Trees · Approach: DFS count
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/count-complete-tree-nodes/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function countNodes(root: TreeNode | null): number {
  if (!root) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
}
