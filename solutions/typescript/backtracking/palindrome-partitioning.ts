// LeetCode 131 — Palindrome Partitioning (Medium)
// Category: Backtracking · Approach: Backtracking
// Time: O(n · 2^n) | Space: O(n)
// Source: https://leetcode.com/problems/palindrome-partitioning/

function partition(s: string): string[][] {
  const res: string[][] = [];
  const path: string[] = [];
  function isPal(l: number, r: number): boolean {
    while (l < r) {
      if (s[l] !== s[r]) return false;
      l++;
      r--;
    }
    return true;
  }
  function bt(start: number): void {
    if (start === s.length) {
      res.push(path.slice());
      return;
    }
    for (let end = start; end < s.length; end++) {
      if (isPal(start, end)) {
        path.push(s.slice(start, end + 1));
        bt(end + 1);
        path.pop();
      }
    }
  }
  bt(0);
  return res;
}
