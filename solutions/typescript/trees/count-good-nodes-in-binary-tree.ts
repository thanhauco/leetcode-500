// LeetCode 1448 — Count Good Nodes in Binary Tree (Medium)
// Category: Trees · Approach: DFS
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/count-good-nodes-in-binary-tree/

function goodNodes(root: TreeNode | null): number {
  let count = 0;
  const dfs = (n: TreeNode | null, mx: number): void => {
    if (!n) return;
    if (n.val >= mx) { count++; mx = n.val; }
    dfs(n.left, mx);
    dfs(n.right, mx);
  };
  dfs(root, -Infinity);
  return count;
}
