// LeetCode 938 — Range Sum of BST (Easy)
// Category: Trees · Approach: DFS
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/range-sum-of-bst/

function rangeSumBST(root: TreeNode | null, low: number, high: number): number {
  if (!root) return 0;
  const inside = root.val >= low && root.val <= high ? root.val : 0;
  return inside + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high);
}
