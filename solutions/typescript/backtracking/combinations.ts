// LeetCode 77 — Combinations (Medium)
// Category: Backtracking · Approach: Backtracking
// Time: O(k · C(n,k)) | Space: O(k)
// Source: https://leetcode.com/problems/combinations/

function combine(n: number, k: number): number[][] {
  const res: number[][] = [];
  const path: number[] = [];
  function bt(start: number): void {
    if (path.length === k) {
      res.push(path.slice());
      return;
    }
    for (let i = start; i <= n; i++) {
      path.push(i);
      bt(i + 1);
      path.pop();
    }
  }
  bt(1);
  return res;
}
