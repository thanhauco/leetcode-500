// LeetCode 526 — Beautiful Arrangement (Medium)
// Category: Backtracking · Approach: Backtracking
// Time: O(k) | Space: O(n)
// Source: https://leetcode.com/problems/beautiful-arrangement/

function countArrangement(n: number): number {
  const used = new Array<boolean>(n + 1).fill(false);
  const backtrack = (pos: number): number => {
    if (pos > n) return 1;
    let total = 0;
    for (let v = 1; v <= n; v++) {
      if (!used[v] && (v % pos === 0 || pos % v === 0)) {
        used[v] = true;
        total += backtrack(pos + 1);
        used[v] = false;
      }
    }
    return total;
  };
  return backtrack(1);
}
