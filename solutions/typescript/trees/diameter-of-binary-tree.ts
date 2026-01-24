// LeetCode 543 — Diameter of Binary Tree (Easy)
// Category: Trees · Approach: Height + running max
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/diameter-of-binary-tree/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function diameterOfBinaryTree(root: TreeNode | null): number {
  let best = 0;
  function depth(node: TreeNode | null): number {
    if (!node) return 0;
    const left = depth(node.left);
    const right = depth(node.right);
    best = Math.max(best, left + right);
    return 1 + Math.max(left, right);
  }
  depth(root);
  return best;
}
