// LeetCode 216 — Combination Sum III (Medium)
// Category: Backtracking · Approach: Backtracking
// Time: O(C(9, k)) | Space: O(k)
// Source: https://leetcode.com/problems/combination-sum-iii/

function combinationSum3(k: number, n: number): number[][] {
  const res: number[][] = [];
  const dfs = (start: number, need: number, remain: number, path: number[]): void => {
    if (need === 0) {
      if (remain === 0) res.push([...path]);
      return;
    }
    for (let x = start; x <= 9; x++) {
      if (x > remain) break;
      path.push(x);
      dfs(x + 1, need - 1, remain - x, path);
      path.pop();
    }
  };
  dfs(1, k, n, []);
  return res;
}
