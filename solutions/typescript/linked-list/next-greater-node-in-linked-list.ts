// LeetCode 1019 — Next Greater Node In Linked List (Medium)
// Category: Linked List · Approach: Monotonic stack
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/next-greater-node-in-linked-list/

function nextLargerNodes(values: number[]): number[] {
  const res = new Array<number>(values.length).fill(0);
  const stack: number[] = [];
  for (let i = 0; i < values.length; i++) {
    while (stack.length && values[stack[stack.length - 1]] < values[i]) {
      res[stack.pop()!] = values[i];
    }
    stack.push(i);
  }
  return res;
}
