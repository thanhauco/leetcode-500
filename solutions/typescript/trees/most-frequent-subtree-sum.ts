// LeetCode 508 — Most Frequent Subtree Sum (Medium)
// Category: Trees · Approach: Postorder
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/most-frequent-subtree-sum/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function findFrequentTreeSum(root: TreeNode | null): number[] {
  const cnt = new Map<number, number>();
  const dfs = (n: TreeNode | null): number => {
    if (!n) return 0;
    const s = n.val + dfs(n.left) + dfs(n.right);
    cnt.set(s, (cnt.get(s) ?? 0) + 1);
    return s;
  };
  dfs(root);
  let hi = 0;
  for (const c of cnt.values()) hi = Math.max(hi, c);
  const res: number[] = [];
  for (const [s, c] of cnt) if (c === hi) res.push(s);
  return res;
}
