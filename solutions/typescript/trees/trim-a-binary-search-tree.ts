// LeetCode 669 — Trim a Binary Search Tree (Medium)
// Category: Trees · Approach: BST trim
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/trim-a-binary-search-tree/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function trimBST(root: TreeNode | null, low: number, high: number): TreeNode | null {
  if (!root) return null;
  if (root.val < low) return trimBST(root.right, low, high);
  if (root.val > high) return trimBST(root.left, low, high);
  root.left = trimBST(root.left, low, high);
  root.right = trimBST(root.right, low, high);
  return root;
}
