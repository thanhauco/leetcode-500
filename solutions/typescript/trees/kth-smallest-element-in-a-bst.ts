// LeetCode 230 — Kth Smallest Element in a BST (Medium)
// Category: Trees · Approach: Inorder
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/kth-smallest-element-in-a-bst/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function kthSmallest(root: TreeNode | null, k: number): number {
  const order: number[] = [];
  function inorder(node: TreeNode | null): void {
    if (!node || order.length >= k) return;
    inorder(node.left);
    order.push(node.val);
    inorder(node.right);
  }
  inorder(root);
  return order[k - 1];
}
