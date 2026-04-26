// LeetCode 1372 — Longest ZigZag Path in a Binary Tree (Medium)
// Category: Trees · Approach: Tree DP
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function longestZigZag(root: TreeNode | null): number {
  let best = 0;
  const dfs = (node: TreeNode | null): [number, number] => {
    if (!node) return [-1, -1];
    const left = dfs(node.left)[1] + 1;
    const right = dfs(node.right)[0] + 1;
    best = Math.max(best, left, right);
    return [left, right];
  };
  dfs(root);
  return best;
}
