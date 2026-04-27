// LeetCode 654 — Maximum Binary Tree (Medium)
// Category: Trees · Approach: Recursive max-split
// Time: O(n²) | Space: O(n)
// Source: https://leetcode.com/problems/maximum-binary-tree/

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

function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
  function build(lo: number, hi: number): TreeNode | null {
    if (lo > hi) return null;
    let mi = lo;
    for (let i = lo + 1; i <= hi; i++) if (nums[i] > nums[mi]) mi = i;
    return new TreeNode(nums[mi], build(lo, mi - 1), build(mi + 1, hi));
  }
  return build(0, nums.length - 1);
}
