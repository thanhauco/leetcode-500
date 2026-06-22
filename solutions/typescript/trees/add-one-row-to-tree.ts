// LeetCode 623 — Add One Row to Tree (Medium)
// Category: Trees · Approach: DFS insert
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/add-one-row-to-tree/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val; this.left = left; this.right = right;
  }
}

function addOneRow(root: TreeNode | null, val: number, depth: number): TreeNode | null {
  if (depth === 1) return new TreeNode(val, root);
  const dfs = (n: TreeNode | null, d: number): void => {
    if (!n) return;
    if (d === depth - 1) {
      n.left = new TreeNode(val, n.left);
      n.right = new TreeNode(val, null, n.right);
    } else { dfs(n.left, d + 1); dfs(n.right, d + 1); }
  };
  dfs(root, 1);
  return root;
}
