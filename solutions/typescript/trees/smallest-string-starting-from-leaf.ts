// LeetCode 988 — Smallest String Starting From Leaf (Medium)
// Category: Trees · Approach: DFS with prepend
// Time: O(n · h) | Space: O(h)
// Source: https://leetcode.com/problems/smallest-string-starting-from-leaf/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) {
    this.val = val;
  }
}

function smallestFromLeaf(root: TreeNode | null): string {
  let best: string | null = null;
  const dfs = (node: TreeNode | null, suffix: string) => {
    if (!node) return;
    const s = String.fromCharCode(97 + node.val) + suffix;
    if (!node.left && !node.right) {
      if (best === null || s < best) best = s;
      return;
    }
    dfs(node.left, s);
    dfs(node.right, s);
  };
  dfs(root, "");
  return best ?? "";
}
