// LeetCode 606 — Construct String from Binary Tree (Easy)
// Category: Trees · Approach: Preorder string
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/construct-string-from-binary-tree/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function tree2str(root: TreeNode | null): string {
  if (!root) return "";
  let s = String(root.val);
  if (root.left || root.right) {
    s += "(" + tree2str(root.left) + ")";
    if (root.right) s += "(" + tree2str(root.right) + ")";
  }
  return s;
}
