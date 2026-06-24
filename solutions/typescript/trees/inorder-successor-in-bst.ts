// LeetCode 285 — Inorder Successor in BST (Medium)
// Category: Trees · Approach: BST successor
// Time: O(h) | Space: O(1)
// Source: https://leetcode.com/problems/inorder-successor-in-bst/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function inorderSuccessor(root: TreeNode, p: number): number | null {
  let succ: number | null = null;
  let node: TreeNode | null = root;
  while (node) {
    if (p < node.val) { succ = node.val; node = node.left; }
    else node = node.right;
  }
  return succ;
}
