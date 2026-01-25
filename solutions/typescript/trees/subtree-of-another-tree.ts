// LeetCode 572 — Subtree of Another Tree (Easy)
// Category: Trees · Approach: DFS + same-tree
// Time: O(m · n) | Space: O(h)
// Source: https://leetcode.com/problems/subtree-of-another-tree/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  function same(a: TreeNode | null, b: TreeNode | null): boolean {
    if (!a && !b) return true;
    if (!a || !b || a.val !== b.val) return false;
    return same(a.left, b.left) && same(a.right, b.right);
  }
  function contains(node: TreeNode | null, sub: TreeNode | null): boolean {
    if (!sub) return true;
    if (!node) return false;
    return same(node, sub) || contains(node.left, sub) || contains(node.right, sub);
  }
  return contains(root, subRoot);
}
