// LeetCode 617 — Merge Two Binary Trees (Easy)
// Category: Trees · Approach: DFS
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/merge-two-binary-trees/

function mergeTrees(a: TreeNode | null, b: TreeNode | null): TreeNode | null {
  if (!a && !b) return null;
  const node = new TreeNode((a ? a.val : 0) + (b ? b.val : 0));
  node.left = mergeTrees(a ? a.left : null, b ? b.left : null);
  node.right = mergeTrees(a ? a.right : null, b ? b.right : null);
  return node;
}
