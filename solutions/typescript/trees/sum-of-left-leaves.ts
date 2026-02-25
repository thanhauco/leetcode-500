// LeetCode 404 — Sum of Left Leaves (Easy)
// Category: Trees · Approach: DFS
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/sum-of-left-leaves/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function sumOfLeftLeaves(root: TreeNode | null): number {
  const dfs = (node: TreeNode | null, isLeft: boolean): number => {
    if (!node) return 0;
    if (!node.left && !node.right) return isLeft ? node.val : 0;
    return dfs(node.left, true) + dfs(node.right, false);
  };
  return dfs(root, false);
}
