// LeetCode 671 — Second Minimum Node In a Binary Tree (Easy)
// Category: Trees · Approach: Scan for second min
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/second-minimum-node-in-a-binary-tree/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function findSecondMinimumValue(root: TreeNode): number {
  const minimum = root.val;
  let second = Infinity;
  const dfs = (node: TreeNode | null) => {
    if (!node) return;
    if (node.val > minimum && node.val < second) second = node.val;
    dfs(node.left);
    dfs(node.right);
  };
  dfs(root);
  return second === Infinity ? -1 : second;
}
