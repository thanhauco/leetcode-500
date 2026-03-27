// LeetCode 236 — Lowest Common Ancestor of a Binary Tree (Medium)
// Category: Trees · Approach: DFS
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/

function lowestCommonAncestor(root: TreeNode | null, p: number, q: number): number | null {
  const f = (n: TreeNode | null): TreeNode | null => {
    if (!n) return null;
    if (n.val === p || n.val === q) return n;
    const left = f(n.left);
    const right = f(n.right);
    if (left && right) return n;
    return left ?? right;
  };
  const node = f(root);
  return node ? node.val : null;
}
