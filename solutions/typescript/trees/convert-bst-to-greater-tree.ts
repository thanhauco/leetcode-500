// LeetCode 538 — Convert BST to Greater Tree (Medium)
// Category: Trees · Approach: Reverse inorder
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/convert-bst-to-greater-tree/

function convertBST(root: TreeNode | null): TreeNode | null {
  let running = 0;
  const go = (n: TreeNode | null): void => {
    if (!n) return;
    go(n.right);
    running += n.val;
    n.val = running;
    go(n.left);
  };
  go(root);
  return root;
}
