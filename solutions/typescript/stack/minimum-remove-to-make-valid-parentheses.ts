// LeetCode 1249 — Minimum Remove to Make Valid Parentheses (Medium)
// Category: Stack · Approach: Index stack
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/

function minRemoveToMakeValid(s: string): string {
  const chars = s.split("");
  const stack: number[] = [];
  for (let i = 0; i < chars.length; i++) {
    if (chars[i] === "(") {
      stack.push(i);
    } else if (chars[i] === ")") {
      if (stack.length) stack.pop();
      else chars[i] = "";
    }
  }
  for (const i of stack) chars[i] = "";
  return chars.join("");
}
