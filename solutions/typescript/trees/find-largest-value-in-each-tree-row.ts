// LeetCode 515 — Find Largest Value in Each Tree Row (Medium)
// Category: Trees · Approach: Level-order BFS
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/find-largest-value-in-each-tree-row/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function largestValues(root: TreeNode | null): number[] {
  if (!root) return [];
  const res: number[] = [];
  let level: TreeNode[] = [root];
  while (level.length) {
    let mx = -Infinity;
    const next: TreeNode[] = [];
    for (const node of level) {
      if (node.val > mx) mx = node.val;
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    res.push(mx);
    level = next;
  }
  return res;
}
