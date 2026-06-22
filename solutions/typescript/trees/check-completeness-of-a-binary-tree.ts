// LeetCode 958 — Check Completeness of a Binary Tree (Medium)
// Category: Trees · Approach: BFS gap check
// Time: O(n) | Space: O(w)
// Source: https://leetcode.com/problems/check-completeness-of-a-binary-tree/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0) { this.val = val; }
}

function isCompleteTree(root: TreeNode | null): boolean {
  const q: (TreeNode | null)[] = [root];
  let seenNull = false;
  while (q.length) {
    const node = q.shift()!;
    if (node === null) seenNull = true;
    else {
      if (seenNull) return false;
      q.push(node.left);
      q.push(node.right);
    }
  }
  return true;
}
