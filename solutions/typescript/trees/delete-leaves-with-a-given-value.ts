// LeetCode 1325 — Delete Leaves With a Given Value (Medium)
// Category: Trees · Approach: Post-order delete
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/delete-leaves-with-a-given-value/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function removeLeafNodes(root: TreeNode | null, target: number): TreeNode | null {
  if (!root) return null;
  root.left = removeLeafNodes(root.left, target);
  root.right = removeLeafNodes(root.right, target);
  if (!root.left && !root.right && root.val === target) return null;
  return root;
}
