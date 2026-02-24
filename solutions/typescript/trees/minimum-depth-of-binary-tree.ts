// LeetCode 111 — Minimum Depth of Binary Tree (Easy)
// Category: Trees · Approach: DFS
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/minimum-depth-of-binary-tree/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function minDepth(root: TreeNode | null): number {
  if (!root) return 0;
  if (!root.left) return 1 + minDepth(root.right);
  if (!root.right) return 1 + minDepth(root.left);
  return 1 + Math.min(minDepth(root.left), minDepth(root.right));
}
