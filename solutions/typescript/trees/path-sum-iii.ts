// LeetCode 437 — Path Sum III (Medium)
// Category: Trees · Approach: Prefix sum
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/path-sum-iii/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function pathSum(root: TreeNode | null, target: number): number {
  const counts = new Map<number, number>([[0, 1]]);
  const dfs = (node: TreeNode | null, prefix: number): number => {
    if (!node) return 0;
    prefix += node.val;
    let total = counts.get(prefix - target) ?? 0;
    counts.set(prefix, (counts.get(prefix) ?? 0) + 1);
    total += dfs(node.left, prefix) + dfs(node.right, prefix);
    counts.set(prefix, counts.get(prefix)! - 1);
    return total;
  };
  return dfs(root, 0);
}
