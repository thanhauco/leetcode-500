// LeetCode 1161 — Maximum Level Sum of a Binary Tree (Medium)
// Category: Trees · Approach: Level-order BFS
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function maxLevelSum(root: TreeNode): number {
  let best = -Infinity;
  let ans = 1;
  let level: TreeNode[] = [root];
  let depth = 0;
  while (level.length) {
    depth++;
    let total = 0;
    const next: TreeNode[] = [];
    for (const node of level) {
      total += node.val;
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    if (total > best) {
      best = total;
      ans = depth;
    }
    level = next;
  }
  return ans;
}
