// LeetCode 270 — Closest Binary Search Tree Value (Easy)
// Category: Trees · Approach: BST descent
// Time: O(h) | Space: O(1)
// Source: https://leetcode.com/problems/closest-binary-search-tree-value/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function closestValue(root: TreeNode, target: number): number {
  let closest = root.val;
  let node: TreeNode | null = root;
  while (node) {
    const d = Math.abs(node.val - target);
    const bd = Math.abs(closest - target);
    if (d < bd || (d === bd && node.val < closest)) closest = node.val;
    node = target < node.val ? node.left : node.right;
  }
  return closest;
}
