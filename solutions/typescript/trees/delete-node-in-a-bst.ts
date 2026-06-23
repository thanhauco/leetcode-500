// LeetCode 450 — Delete Node in a BST (Medium)
// Category: Trees · Approach: BST delete
// Time: O(h) | Space: O(h)
// Source: https://leetcode.com/problems/delete-node-in-a-bst/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  if (!root) return null;
  if (key < root.val) root.left = deleteNode(root.left, key);
  else if (key > root.val) root.right = deleteNode(root.right, key);
  else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    let m = root.right;
    while (m.left) m = m.left;
    root.val = m.val;
    root.right = deleteNode(root.right, m.val);
  }
  return root;
}
