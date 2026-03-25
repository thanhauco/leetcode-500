// LeetCode 94 — Binary Tree Inorder Traversal (Easy)
// Category: Trees · Approach: DFS
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/binary-tree-inorder-traversal/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function inorderTraversal(root: TreeNode | null): number[] {
  const out: number[] = [];
  const go = (n: TreeNode | null): void => {
    if (!n) return;
    go(n.left);
    out.push(n.val);
    go(n.right);
  };
  go(root);
  return out;
}
