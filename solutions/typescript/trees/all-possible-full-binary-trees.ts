// LeetCode 894 — All Possible Full Binary Trees (Medium)
// Category: Trees · Approach: Memoized build
// Time: O(Cₙ) | Space: O(Cₙ)
// Source: https://leetcode.com/problems/all-possible-full-binary-trees/

class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function allPossibleFBT(n: number): (TreeNode | null)[] {
  const memo = new Map<number, (TreeNode | null)[]>();
  function build(k: number): (TreeNode | null)[] {
    if (k % 2 === 0) return [];
    if (k === 1) return [new TreeNode(0)];
    if (memo.has(k)) return memo.get(k)!;
    const out: (TreeNode | null)[] = [];
    for (let l = 1; l < k; l += 2) {
      for (const left of build(l)) {
        for (const right of build(k - 1 - l)) {
          out.push(new TreeNode(0, left, right));
        }
      }
    }
    memo.set(k, out);
    return out;
  }
  return build(n);
}
