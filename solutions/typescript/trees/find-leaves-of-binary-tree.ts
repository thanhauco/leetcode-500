// LeetCode 366 — Find Leaves of Binary Tree (Medium)
// Category: Trees · Approach: Post-order
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/find-leaves-of-binary-tree/

function findLeaves(root: TreeNode | null): number[][] {
  const res: number[][] = [];
  const height = (n: TreeNode | null): number => {
    if (!n) return -1;
    const h = 1 + Math.max(height(n.left), height(n.right));
    if (!res[h]) res[h] = [];
    res[h].push(n.val);
    return h;
  };
  height(root);
  return res;
}
