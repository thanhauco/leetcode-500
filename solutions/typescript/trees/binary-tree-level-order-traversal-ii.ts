// LeetCode 107 — Binary Tree Level Order Traversal II (Medium)
// Category: Trees · Approach: BFS
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/binary-tree-level-order-traversal-ii/

function levelOrderBottom(root: TreeNode | null): number[][] {
  if (!root) return [];
  const res: number[][] = [];
  let q: TreeNode[] = [root];
  while (q.length) {
    const vals: number[] = [];
    const next: TreeNode[] = [];
    for (const n of q) {
      vals.push(n.val);
      if (n.left) next.push(n.left);
      if (n.right) next.push(n.right);
    }
    res.push(vals);
    q = next;
  }
  return res.reverse();
}
