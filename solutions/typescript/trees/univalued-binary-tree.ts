// LeetCode 965 — Univalued Binary Tree (Easy)
// Category: Trees · Approach: DFS
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/univalued-binary-tree/

function isUnivalTree(root: TreeNode | null): boolean {
  if (!root) return true;
  const target = root.val;
  const dfs = (n: TreeNode | null): boolean => {
    if (!n) return true;
    if (n.val !== target) return false;
    return dfs(n.left) && dfs(n.right);
  };
  return dfs(root);
}
