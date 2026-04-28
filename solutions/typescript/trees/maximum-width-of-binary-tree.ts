// LeetCode 662 — Maximum Width of Binary Tree (Medium)
// Category: Trees · Approach: Indexed BFS
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/maximum-width-of-binary-tree/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function widthOfBinaryTree(root: TreeNode | null): number {
  if (!root) return 0;
  let best = 0;
  let level: [TreeNode, number][] = [[root, 0]];
  while (level.length) {
    const first = level[0][1];
    best = Math.max(best, level[level.length - 1][1] - first + 1);
    const next: [TreeNode, number][] = [];
    for (const [node, i] of level) {
      const idx = i - first;
      if (node.left) next.push([node.left, 2 * idx]);
      if (node.right) next.push([node.right, 2 * idx + 1]);
    }
    level = next;
  }
  return best;
}
