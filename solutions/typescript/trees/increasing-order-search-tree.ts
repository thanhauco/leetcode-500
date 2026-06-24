// LeetCode 897 — Increasing Order Search Tree (Easy)
// Category: Trees · Approach: Inorder rebuild
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/increasing-order-search-tree/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function increasingBST(root: TreeNode | null): TreeNode | null {
  const vals: number[] = [];
  const ino = (n: TreeNode | null): void => {
    if (!n) return;
    ino(n.left); vals.push(n.val); ino(n.right);
  };
  ino(root);
  const dummy = new TreeNode();
  let cur = dummy;
  for (const v of vals) { cur.right = new TreeNode(v); cur = cur.right; }
  return dummy.right;
}
