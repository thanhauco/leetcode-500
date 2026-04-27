// LeetCode 1339 — Maximum Product of Splitted Binary Tree (Medium)
// Category: Trees · Approach: Two-pass subtree sums
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/maximum-product-of-splitted-binary-tree/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function maxProduct(root: TreeNode | null): number {
  const sums: number[] = [];
  const total = (node: TreeNode | null): number => {
    if (!node) return 0;
    const s = node.val + total(node.left) + total(node.right);
    sums.push(s);
    return s;
  };
  const grand = total(root);
  let best = 0;
  for (const s of sums) best = Math.max(best, s * (grand - s));
  return best % 1000000007;
}
