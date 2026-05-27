// LeetCode 563 — Binary Tree Tilt (Easy)
// Category: Trees · Approach: Post-order
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/binary-tree-tilt/

function findTilt(root: TreeNode | null): number {
  let total = 0;
  const sum = (n: TreeNode | null): number => {
    if (!n) return 0;
    const l = sum(n.left), r = sum(n.right);
    total += Math.abs(l - r);
    return n.val + l + r;
  };
  sum(root);
  return total;
}
