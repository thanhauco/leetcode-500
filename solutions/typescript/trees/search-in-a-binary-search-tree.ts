// LeetCode 700 — Search in a Binary Search Tree (Easy)
// Category: Trees · Approach: BST walk
// Time: O(h) | Space: O(1)
// Source: https://leetcode.com/problems/search-in-a-binary-search-tree/

function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  let node = root;
  while (node) {
    if (node.val === val) return node;
    node = val < node.val ? node.left : node.right;
  }
  return null;
}
