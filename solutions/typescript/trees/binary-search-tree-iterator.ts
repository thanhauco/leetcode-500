// LeetCode 173 — Binary Search Tree Iterator (Medium)
// Category: Trees · Approach: Flatten inorder
// Time: O(n) build, O(1) amortized per call | Space: O(n)
// Source: https://leetcode.com/problems/binary-search-tree-iterator/

class BSTIterator {
  private order: number[] = [];
  private idx = 0;
  constructor(root: TreeNode | null) {
    const go = (n: TreeNode | null): void => {
      if (!n) return;
      go(n.left);
      this.order.push(n.val);
      go(n.right);
    };
    go(root);
  }
  next(): number { return this.order[this.idx++]; }
  hasNext(): boolean { return this.idx < this.order.length; }
}
