// LeetCode 1457 — Pseudo-Palindromic Paths in a Binary Tree (Medium)
// Category: Trees · Approach: Parity bitmask
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/pseudo-palindromic-paths-in-a-binary-tree/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function pseudoPalindromicPaths(root: TreeNode | null): number {
  let count = 0;
  const dfs = (node: TreeNode | null, mask: number) => {
    if (!node) return;
    mask ^= 1 << node.val;
    if (!node.left && !node.right) {
      if ((mask & (mask - 1)) === 0) count++;
      return;
    }
    dfs(node.left, mask);
    dfs(node.right, mask);
  };
  dfs(root, 0);
  return count;
}
