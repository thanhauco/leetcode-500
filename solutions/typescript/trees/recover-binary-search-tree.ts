// LeetCode 99 — Recover Binary Search Tree (Medium)
// Category: Trees · Approach: Inorder swap
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/recover-binary-search-tree/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function recoverTree(root: TreeNode | null): void {
  let first: TreeNode | null = null, second: TreeNode | null = null, prev: TreeNode | null = null;
  const ino = (n: TreeNode | null): void => {
    if (!n) return;
    ino(n.left);
    if (prev && prev.val > n.val) {
      if (!first) first = prev;
      second = n;
    }
    prev = n;
    ino(n.right);
  };
  ino(root);
  if (first && second) {
    const t = first.val; first.val = second.val; second.val = t;
  }
}
