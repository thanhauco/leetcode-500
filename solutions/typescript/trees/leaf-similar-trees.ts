// LeetCode 872 — Leaf-Similar Trees (Easy)
// Category: Trees · Approach: DFS
// Time: O(n + m) | Space: O(n + m)
// Source: https://leetcode.com/problems/leaf-similar-trees/

function leafSimilar(root1: TreeNode | null, root2: TreeNode | null): boolean {
  const leaves = (n: TreeNode | null, out: number[]): void => {
    if (!n) return;
    if (!n.left && !n.right) { out.push(n.val); return; }
    leaves(n.left, out);
    leaves(n.right, out);
  };
  const a: number[] = [], b: number[] = [];
  leaves(root1, a);
  leaves(root2, b);
  return a.length === b.length && a.every((v, i) => v === b[i]);
}
