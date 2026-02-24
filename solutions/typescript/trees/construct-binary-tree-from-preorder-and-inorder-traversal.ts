// LeetCode 105 — Construct Binary Tree from Preorder and Inorder Traversal (Medium)
// Category: Trees · Approach: Divide and conquer
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  const index = new Map<number, number>();
  inorder.forEach((v, i) => index.set(v, i));
  let pre = 0;
  const rec = (lo: number, hi: number): TreeNode | null => {
    if (lo > hi) return null;
    const val = preorder[pre++];
    const node = new TreeNode(val);
    const mid = index.get(val)!;
    node.left = rec(lo, mid - 1);
    node.right = rec(mid + 1, hi);
    return node;
  };
  return rec(0, inorder.length - 1);
}
