// LeetCode 98 — Validate Binary Search Tree (Medium)
// Category: Trees · Approach: Range bounds
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/validate-binary-search-tree/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function isValidBST(root: TreeNode | null): boolean {
  function valid(node: TreeNode | null, low: number, high: number): boolean {
    if (!node) return true;
    if (!(node.val > low && node.val < high)) return false;
    return valid(node.left, low, node.val) && valid(node.right, node.val, high);
  }
  return valid(root, -Infinity, Infinity);
}
