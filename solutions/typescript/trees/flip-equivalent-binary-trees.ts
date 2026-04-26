// LeetCode 951 — Flip Equivalent Binary Trees (Medium)
// Category: Trees · Approach: Recursive two-way match
// Time: O(min(n, m)) | Space: O(min(h₁, h₂))
// Source: https://leetcode.com/problems/flip-equivalent-binary-trees/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function flipEquiv(a: TreeNode | null, b: TreeNode | null): boolean {
  if (a === null && b === null) return true;
  if (a === null || b === null || a.val !== b.val) return false;
  return (
    (flipEquiv(a.left, b.left) && flipEquiv(a.right, b.right)) ||
    (flipEquiv(a.left, b.right) && flipEquiv(a.right, b.left))
  );
}
