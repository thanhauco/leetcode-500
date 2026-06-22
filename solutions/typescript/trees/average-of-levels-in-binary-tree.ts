// LeetCode 637 — Average of Levels in Binary Tree (Easy)
// Category: Trees · Approach: BFS
// Time: O(n) | Space: O(w)
// Source: https://leetcode.com/problems/average-of-levels-in-binary-tree/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function averageOfLevels(root: TreeNode | null): number[] {
  const res: number[] = [];
  let q: TreeNode[] = root ? [root] : [];
  while (q.length) {
    let total = 0;
    const next: TreeNode[] = [];
    for (const node of q) {
      total += node.val;
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    res.push(total / q.length);
    q = next;
  }
  return res;
}
