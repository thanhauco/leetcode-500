// LeetCode 856 — Score of Parentheses (Medium)
// Category: Stack · Approach: Depth stack
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/score-of-parentheses/

function scoreOfParentheses(s: string): number {
  const stack: number[] = [0];
  for (const c of s) {
    if (c === "(") {
      stack.push(0);
    } else {
      const v = stack.pop()!;
      stack[stack.length - 1] += Math.max(2 * v, 1);
    }
  }
  return stack[0];
}
