// LeetCode 114 — Flatten Binary Tree to Linked List (Medium)
// Category: Trees · Approach: Preorder
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/flatten-binary-tree-to-linked-list/

function flatten(root: TreeNode | null): number[] {
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
