// LeetCode 501 — Find Mode in Binary Search Tree (Easy)
// Category: Trees · Approach: Counting
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/find-mode-in-binary-search-tree/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function findMode(root: TreeNode | null): number[] {
  const cnt = new Map<number, number>();
  const dfs = (n: TreeNode | null): void => {
    if (!n) return;
    cnt.set(n.val, (cnt.get(n.val) ?? 0) + 1);
    dfs(n.left); dfs(n.right);
  };
  dfs(root);
  let hi = 0;
  for (const c of cnt.values()) hi = Math.max(hi, c);
  const res: number[] = [];
  for (const [v, c] of cnt) if (c === hi) res.push(v);
  return res;
}
