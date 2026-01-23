// LeetCode 22 — Generate Parentheses (Medium)
// Category: Stack · Approach: Backtracking
// Time: O(4^n / √n) | Space: O(n)
// Source: https://leetcode.com/problems/generate-parentheses/

function generateParenthesis(n: number): string[] {
  const res: string[] = [];
  const backtrack = (cur: string, open: number, close: number): void => {
    if (cur.length === 2 * n) {
      res.push(cur);
      return;
    }
    if (open < n) backtrack(cur + "(", open + 1, close);
    if (close < open) backtrack(cur + ")", open, close + 1);
  };
  backtrack("", 0, 0);
  return res;
}
