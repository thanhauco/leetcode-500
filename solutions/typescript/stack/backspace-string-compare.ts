// LeetCode 844 — Backspace String Compare (Easy)
// Category: Stack · Approach: Stack
// Time: O(n + m) | Space: O(n + m)
// Source: https://leetcode.com/problems/backspace-string-compare/

function backspaceCompare(s: string, t: string): boolean {
  const build = (text: string): string => {
    const stack: string[] = [];
    for (const c of text) {
      if (c === "#") stack.pop();
      else stack.push(c);
    }
    return stack.join("");
  };
  return build(s) === build(t);
}
