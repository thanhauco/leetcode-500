// LeetCode 1469 — Find All The Lonely Nodes (Easy)
// Category: Trees · Approach: DFS
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/find-all-the-lonely-nodes/

function getLonelyNodes(root: TreeNode | null): number[] {
  const out: number[] = [];
  const dfs = (n: TreeNode | null): void => {
    if (!n) return;
    if (n.left && !n.right) out.push(n.left.val);
    if (n.right && !n.left) out.push(n.right.val);
    dfs(n.left);
    dfs(n.right);
  };
  dfs(root);
  return out;
}
