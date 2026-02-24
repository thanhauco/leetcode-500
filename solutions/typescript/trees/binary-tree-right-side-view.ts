// LeetCode 199 — Binary Tree Right Side View (Medium)
// Category: Trees · Approach: BFS
// Time: O(n) | Space: O(w)
// Source: https://leetcode.com/problems/binary-tree-right-side-view/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function rightSideView(root: TreeNode | null): number[] {
  if (!root) return [];
  const view: number[] = [];
  let level: TreeNode[] = [root];
  while (level.length) {
    view.push(level[level.length - 1].val);
    const next: TreeNode[] = [];
    for (const node of level) {
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    level = next;
  }
  return view;
}
