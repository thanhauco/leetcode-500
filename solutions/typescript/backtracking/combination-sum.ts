// LeetCode 39 — Combination Sum (Medium)
// Category: Backtracking · Approach: Backtracking
// Time: O(n^(T/m)) | Space: O(T/m)
// Source: https://leetcode.com/problems/combination-sum/

function combinationSum(candidates: number[], target: number): number[][] {
  const res: number[][] = [];
  const path: number[] = [];
  const dfs = (start: number, remain: number): void => {
    if (remain === 0) { res.push([...path]); return; }
    if (remain < 0) return;
    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      dfs(i, remain - candidates[i]);
      path.pop();
    }
  };
  dfs(0, target);
  return res;
}
