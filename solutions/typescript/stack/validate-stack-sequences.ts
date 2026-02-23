// LeetCode 946 — Validate Stack Sequences (Medium)
// Category: Stack · Approach: Simulation
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/validate-stack-sequences/

function validateStackSequences(pushed: number[], popped: number[]): boolean {
  const stack: number[] = [];
  let j = 0;
  for (const x of pushed) {
    stack.push(x);
    while (stack.length && stack[stack.length - 1] === popped[j]) {
      stack.pop();
      j++;
    }
  }
  return stack.length === 0;
}
