// LeetCode 20 — Valid Parentheses (Easy)
// Category: Stack · Approach: Stack
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/valid-parentheses/

function isValid(s: string): boolean {
  const pairs: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
  const stack: string[] = [];
  for (const ch of s) {
    if (ch in pairs) {
      if (stack.pop() !== pairs[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}
