// LeetCode 106 — Construct Binary Tree from Inorder and Postorder Traversal (Medium)
// Category: Trees · Approach: Divide and conquer
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
  const index = new Map<number, number>();
  inorder.forEach((v, i) => index.set(v, i));
  let post = postorder.length - 1;
  const rec = (lo: number, hi: number): TreeNode | null => {
    if (lo > hi) return null;
    const val = postorder[post--];
    const node = new TreeNode(val);
    const mid = index.get(val)!;
    node.right = rec(mid + 1, hi);
    node.left = rec(lo, mid - 1);
    return node;
  };
  return rec(0, inorder.length - 1);
}
