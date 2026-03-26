// LeetCode 144 — Binary Tree Preorder Traversal (Easy)
// Category: Trees · Approach: DFS
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/binary-tree-preorder-traversal/

function preorderTraversal(root: TreeNode | null): number[] {
  const out: number[] = [];
  const go = (n: TreeNode | null): void => {
    if (!n) return;
    out.push(n.val);
    go(n.left);
    go(n.right);
  };
  go(root);
  return out;
}
