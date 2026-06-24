// LeetCode 333 — Largest BST Subtree (Medium)
// Category: Trees · Approach: Postorder
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/largest-bst-subtree/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function largestBSTSubtree(root: TreeNode | null): number {
  let best = 0;
  function dfs(n: TreeNode | null): [boolean, number, number, number] {
    if (!n) return [true, 0, Infinity, -Infinity];
    const [lb, ls, lmin, lmax] = dfs(n.left);
    const [rb, rs, rmin, rmax] = dfs(n.right);
    if (lb && rb && lmax < n.val && n.val < rmin) {
      const size = ls + rs + 1;
      best = Math.max(best, size);
      return [true, size, Math.min(n.val, lmin), Math.max(n.val, rmax)];
    }
    return [false, 0, 0, 0];
  }
  dfs(root);
  return best;
}
