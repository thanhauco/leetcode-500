// LeetCode 783 — Minimum Distance Between BST Nodes (Easy)
// Category: Trees · Approach: In-order
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/minimum-distance-between-bst-nodes/

function minDiffInBST(root: TreeNode | null): number {
  const vals: number[] = [];
  const ino = (n: TreeNode | null): void => {
    if (!n) return;
    ino(n.left);
    vals.push(n.val);
    ino(n.right);
  };
  ino(root);
  let best = Infinity;
  for (let i = 1; i < vals.length; i++) best = Math.min(best, vals[i] - vals[i - 1]);
  return best;
}
