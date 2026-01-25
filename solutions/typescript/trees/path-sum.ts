// LeetCode 112 — Path Sum (Easy)
// Category: Trees · Approach: DFS subtract
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/path-sum/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function hasPathSum(root: TreeNode | null, target: number): boolean {
  if (!root) return false;
  if (!root.left && !root.right) return target === root.val;
  const rem = target - root.val;
  return hasPathSum(root.left, rem) || hasPathSum(root.right, rem);
}
