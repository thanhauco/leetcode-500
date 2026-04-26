// LeetCode 1110 — Delete Nodes And Return Forest (Medium)
// Category: Trees · Approach: Post-order prune
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/delete-nodes-and-return-forest/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function delNodes(root: TreeNode | null, toDelete: number[]): TreeNode[] {
  const targets = new Set(toDelete);
  const forest: TreeNode[] = [];
  const dfs = (node: TreeNode | null, isRoot: boolean): TreeNode | null => {
    if (!node) return null;
    const deleted = targets.has(node.val);
    if (isRoot && !deleted) forest.push(node);
    node.left = dfs(node.left, deleted);
    node.right = dfs(node.right, deleted);
    return deleted ? null : node;
  };
  dfs(root, true);
  return forest;
}
