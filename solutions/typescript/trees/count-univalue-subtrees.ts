// LeetCode 250 — Count Univalue Subtrees (Medium)
// Category: Trees · Approach: Postorder
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/count-univalue-subtrees/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function countUnivalSubtrees(root: TreeNode | null): number {
  let count = 0;
  const dfs = (n: TreeNode | null): boolean => {
    if (!n) return true;
    const l = dfs(n.left), r = dfs(n.right);
    if (!l || !r) return false;
    if (n.left && n.left.val !== n.val) return false;
    if (n.right && n.right.val !== n.val) return false;
    count++;
    return true;
  };
  dfs(root);
  return count;
}
