// LeetCode 1008 — Construct Binary Search Tree from Preorder Traversal (Medium)
// Category: Trees · Approach: Bounded recursion
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function bstFromPreorder(preorder: number[]): TreeNode | null {
  let i = 0;
  const build = (bound: number): TreeNode | null => {
    if (i === preorder.length || preorder[i] > bound) return null;
    const node = new TreeNode(preorder[i++]);
    node.left = build(node.val);
    node.right = build(bound);
    return node;
  };
  return build(Infinity);
}
