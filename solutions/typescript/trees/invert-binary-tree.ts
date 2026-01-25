// LeetCode 226 — Invert Binary Tree (Easy)
// Category: Trees · Approach: DFS swap
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/invert-binary-tree/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  const left = invertTree(root.left);
  root.left = invertTree(root.right);
  root.right = left;
  return root;
}
