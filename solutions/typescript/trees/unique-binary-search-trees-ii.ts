// LeetCode 95 — Unique Binary Search Trees II (Medium)
// Category: Trees · Approach: Recursive build
// Time: O(Cₙ · n) | Space: O(Cₙ · n)
// Source: https://leetcode.com/problems/unique-binary-search-trees-ii/

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

function generateTrees(n: number): (TreeNode | null)[] {
  function build(lo: number, hi: number): (TreeNode | null)[] {
    if (lo > hi) return [null];
    const out: (TreeNode | null)[] = [];
    for (let v = lo; v <= hi; v++) {
      for (const left of build(lo, v - 1)) {
        for (const right of build(v + 1, hi)) {
          out.push(new TreeNode(v, left, right));
        }
      }
    }
    return out;
  }
  return n ? build(1, n) : [];
}
