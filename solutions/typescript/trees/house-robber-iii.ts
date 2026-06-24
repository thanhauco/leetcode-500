// LeetCode 337 — House Robber III (Medium)
// Category: Trees · Approach: Tree DP
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/house-robber-iii/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function rob(root: TreeNode | null): number {
  function dfs(n: TreeNode | null): [number, number] {
    if (!n) return [0, 0];
    const [ls, lr] = dfs(n.left);
    const [rs, rr] = dfs(n.right);
    return [Math.max(ls, lr) + Math.max(rs, rr), n.val + ls + rs];
  }
  const [s, r] = dfs(root);
  return Math.max(s, r);
}
