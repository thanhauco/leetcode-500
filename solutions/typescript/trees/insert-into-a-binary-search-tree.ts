// LeetCode 701 — Insert into a Binary Search Tree (Medium)
// Category: Trees · Approach: Iterative insert
// Time: O(h) | Space: O(1)
// Source: https://leetcode.com/problems/insert-into-a-binary-search-tree/

function insertIntoBST(root: TreeNode | null, val: number): TreeNode {
  const newNode = new TreeNode(val);
  if (!root) return newNode;
  let node: TreeNode = root;
  while (true) {
    if (val < node.val) {
      if (node.left) node = node.left;
      else { node.left = newNode; break; }
    } else {
      if (node.right) node = node.right;
      else { node.right = newNode; break; }
    }
  }
  return root;
}
