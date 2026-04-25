// LeetCode 109 — Convert Sorted List to Binary Search Tree (Medium)
// Category: Trees · Approach: Index-based middle
// Time: O(n) | Space: O(log n)
// Source: https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function sortedListToBST(values: number[]): TreeNode | null {
  function build(lo: number, hi: number): TreeNode | null {
    if (lo > hi) return null;
    const mid = (lo + hi) >> 1;
    return new TreeNode(values[mid], build(lo, mid - 1), build(mid + 1, hi));
  }
  return build(0, values.length - 1);
}
