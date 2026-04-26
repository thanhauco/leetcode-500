// LeetCode 1123 — Lowest Common Ancestor of Deepest Leaves (Medium)
// Category: Trees · Approach: Depth + LCA pass
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function lcaDeepestLeaves(root: TreeNode | null): TreeNode | null {
  const dfs = (node: TreeNode | null): [number, TreeNode | null] => {
    if (!node) return [0, null];
    const [ld, ln] = dfs(node.left);
    const [rd, rn] = dfs(node.right);
    if (ld === rd) return [ld + 1, node];
    return ld > rd ? [ld + 1, ln] : [rd + 1, rn];
  };
  return dfs(root)[1];
}
