// LeetCode 113 — Path Sum II (Medium)
// Category: Trees · Approach: DFS backtracking
// Time: O(n²) | Space: O(h)
// Source: https://leetcode.com/problems/path-sum-ii/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function pathSum(root: TreeNode | null, target: number): number[][] {
  const result: number[][] = [];
  const dfs = (node: TreeNode | null, remaining: number, trail: number[]): void => {
    if (!node) return;
    trail.push(node.val);
    remaining -= node.val;
    if (!node.left && !node.right && remaining === 0) result.push([...trail]);
    else {
      dfs(node.left, remaining, trail);
      dfs(node.right, remaining, trail);
    }
    trail.pop();
  };
  dfs(root, target, []);
  return result;
}
