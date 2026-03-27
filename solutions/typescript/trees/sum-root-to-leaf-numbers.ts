// LeetCode 129 — Sum Root to Leaf Numbers (Medium)
// Category: Trees · Approach: DFS
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/sum-root-to-leaf-numbers/

function sumNumbers(root: TreeNode | null): number {
  let total = 0;
  const dfs = (n: TreeNode | null, cur: number): void => {
    if (!n) return;
    cur = cur * 10 + n.val;
    if (!n.left && !n.right) { total += cur; return; }
    dfs(n.left, cur);
    dfs(n.right, cur);
  };
  dfs(root, 0);
  return total;
}
