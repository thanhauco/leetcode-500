// LeetCode 814 — Binary Tree Pruning (Medium)
// Category: Trees · Approach: Post-order
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/binary-tree-pruning/

function pruneTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  root.left = pruneTree(root.left);
  root.right = pruneTree(root.right);
  if (!root.left && !root.right && root.val === 0) return null;
  return root;
}
