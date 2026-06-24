// LeetCode 687 — Longest Univalue Path (Medium)
// Category: Trees · Approach: Tree DP
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/longest-univalue-path/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function longestUnivaluePath(root: TreeNode | null): number {
  let best = 0;
  const dfs = (n: TreeNode | null): number => {
    if (!n) return 0;
    const l = dfs(n.left), r = dfs(n.right);
    const left = n.left && n.left.val === n.val ? l + 1 : 0;
    const right = n.right && n.right.val === n.val ? r + 1 : 0;
    best = Math.max(best, left + right);
    return Math.max(left, right);
  };
  dfs(root);
  return best;
}
