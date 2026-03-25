// LeetCode 145 — Binary Tree Postorder Traversal (Easy)
// Category: Trees · Approach: DFS
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/binary-tree-postorder-traversal/

function postorderTraversal(root: TreeNode | null): number[] {
  const out: number[] = [];
  const go = (n: TreeNode | null): void => {
    if (!n) return;
    go(n.left);
    go(n.right);
    out.push(n.val);
  };
  go(root);
  return out;
}
