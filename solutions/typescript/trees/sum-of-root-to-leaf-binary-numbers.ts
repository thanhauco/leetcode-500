// LeetCode 1022 — Sum of Root To Leaf Binary Numbers (Easy)
// Category: Trees · Approach: DFS
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/sum-of-root-to-leaf-binary-numbers/

function sumRootToLeaf(root: TreeNode | null): number {
  let total = 0;
  const dfs = (n: TreeNode | null, cur: number): void => {
    if (!n) return;
    cur = cur * 2 + n.val;
    if (!n.left && !n.right) { total += cur; return; }
    dfs(n.left, cur);
    dfs(n.right, cur);
  };
  dfs(root, 0);
  return total;
}
