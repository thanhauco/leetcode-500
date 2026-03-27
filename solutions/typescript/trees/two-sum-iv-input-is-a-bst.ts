// LeetCode 653 — Two Sum IV - Input is a BST (Easy)
// Category: Trees · Approach: DFS + set
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/two-sum-iv-input-is-a-bst/

function findTarget(root: TreeNode | null, k: number): boolean {
  const seen = new Set<number>();
  const dfs = (n: TreeNode | null): boolean => {
    if (!n) return false;
    if (seen.has(k - n.val)) return true;
    seen.add(n.val);
    return dfs(n.left) || dfs(n.right);
  };
  return dfs(root);
}
