// LeetCode 1026 — Maximum Difference Between Node and Ancestor (Medium)
// Category: Trees · Approach: Track min/max on path
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function maxAncestorDiff(root: TreeNode): number {
  let best = 0;
  const dfs = (node: TreeNode | null, lo: number, hi: number) => {
    if (!node) {
      best = Math.max(best, hi - lo);
      return;
    }
    lo = Math.min(lo, node.val);
    hi = Math.max(hi, node.val);
    dfs(node.left, lo, hi);
    dfs(node.right, lo, hi);
  };
  dfs(root, root.val, root.val);
  return best;
}
