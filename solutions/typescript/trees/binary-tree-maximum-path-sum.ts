// LeetCode 124 — Binary Tree Maximum Path Sum (Hard)
// Category: Trees · Approach: DFS
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/binary-tree-maximum-path-sum/

function maxPathSum(root: TreeNode | null): number {
  let best = -Infinity;
  const gain = (n: TreeNode | null): number => {
    if (!n) return 0;
    const left = Math.max(0, gain(n.left));
    const right = Math.max(0, gain(n.right));
    best = Math.max(best, n.val + left + right);
    return n.val + Math.max(left, right);
  };
  gain(root);
  return best;
}
