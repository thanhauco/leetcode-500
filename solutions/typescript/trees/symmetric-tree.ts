// LeetCode 101 — Symmetric Tree (Easy)
// Category: Trees · Approach: Recursive mirror
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/symmetric-tree/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function isSymmetric(root: TreeNode | null): boolean {
  const mirror = (a: TreeNode | null, b: TreeNode | null): boolean => {
    if (!a && !b) return true;
    if (!a || !b || a.val !== b.val) return false;
    return mirror(a.left, b.right) && mirror(a.right, b.left);
  };
  return root ? mirror(root.left, root.right) : true;
}
