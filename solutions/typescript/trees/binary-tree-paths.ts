// LeetCode 257 — Binary Tree Paths (Easy)
// Category: Trees · Approach: DFS
// Time: O(n) | Space: O(h)
// Source: https://leetcode.com/problems/binary-tree-paths/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function binaryTreePaths(root: TreeNode | null): string[] {
  const paths: string[] = [];
  const dfs = (node: TreeNode | null, trail: number[]): void => {
    if (!node) return;
    trail.push(node.val);
    if (!node.left && !node.right) paths.push(trail.join("->"));
    else {
      dfs(node.left, trail);
      dfs(node.right, trail);
    }
    trail.pop();
  };
  dfs(root, []);
  return paths;
}
