// LeetCode 103 — Binary Tree Zigzag Level Order Traversal (Medium)
// Category: Trees · Approach: BFS
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/

function zigzagLevelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const res: number[][] = [];
  let q: TreeNode[] = [root];
  let ltr = true;
  while (q.length) {
    const vals: number[] = [];
    const next: TreeNode[] = [];
    for (const n of q) {
      vals.push(n.val);
      if (n.left) next.push(n.left);
      if (n.right) next.push(n.right);
    }
    res.push(ltr ? vals : vals.reverse());
    ltr = !ltr;
    q = next;
  }
  return res;
}
