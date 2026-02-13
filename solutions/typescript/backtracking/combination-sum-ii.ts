// LeetCode 40 — Combination Sum II (Medium)
// Category: Backtracking · Approach: Backtracking
// Time: O(2^n) | Space: O(n)
// Source: https://leetcode.com/problems/combination-sum-ii/

function combinationSum2(candidates: number[], target: number): number[][] {
  candidates.sort((a, b) => a - b);
  const res: number[][] = [];
  const path: number[] = [];
  function bt(start: number, remain: number): void {
    if (remain === 0) {
      res.push(path.slice());
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      if (i > start && candidates[i] === candidates[i - 1]) continue;
      if (candidates[i] > remain) break;
      path.push(candidates[i]);
      bt(i + 1, remain - candidates[i]);
      path.pop();
    }
  }
  bt(0, target);
  return res;
}
