// LeetCode 2236 — Root Equals Sum of Children (Easy)
// Category: Trees · Approach: Direct
// Time: O(1) | Space: O(1)
// Source: https://leetcode.com/problems/root-equals-sum-of-children/

function checkTree(root: TreeNode): boolean {
  return root.val === root.left!.val + root.right!.val;
}
