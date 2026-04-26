// LeetCode 513 — Find Bottom Left Tree Value (Medium)
// Category: Trees · Approach: Level-order BFS
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/find-bottom-left-tree-value/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function findBottomLeftValue(root: TreeNode): number {
  let level: TreeNode[] = [root];
  let ans = root.val;
  while (level.length) {
    ans = level[0].val;
    const next: TreeNode[] = [];
    for (const node of level) {
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    level = next;
  }
  return ans;
}
