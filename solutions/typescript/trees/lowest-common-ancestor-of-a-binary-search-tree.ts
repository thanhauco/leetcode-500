// LeetCode 235 — Lowest Common Ancestor of a Binary Search Tree (Medium)
// Category: Trees · Approach: BST walk
// Time: O(h) | Space: O(1)
// Source: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function lowestCommonAncestor(root: TreeNode | null, p: number, q: number): number {
  let node = root;
  while (node) {
    if (p > node.val && q > node.val) node = node.right;
    else if (p < node.val && q < node.val) node = node.left;
    else return node.val;
  }
  return -1;
}
