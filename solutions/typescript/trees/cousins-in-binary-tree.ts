// LeetCode 993 — Cousins in Binary Tree (Easy)
// Category: Trees · Approach: DFS
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/cousins-in-binary-tree/

function isCousins(root: TreeNode | null, x: number, y: number): boolean {
  const info: Record<number, { par: number | null; d: number }> = {};
  const dfs = (n: TreeNode | null, par: number | null, d: number): void => {
    if (!n) return;
    if (n.val === x || n.val === y) info[n.val] = { par, d };
    dfs(n.left, n.val, d + 1);
    dfs(n.right, n.val, d + 1);
  };
  dfs(root, null, 0);
  return info[x].d === info[y].d && info[x].par !== info[y].par;
}
