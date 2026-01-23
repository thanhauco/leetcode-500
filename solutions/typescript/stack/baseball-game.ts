// LeetCode 682 — Baseball Game (Easy)
// Category: Stack · Approach: Stack
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/baseball-game/

function calPoints(operations: string[]): number {
  const st: number[] = [];
  for (const op of operations) {
    if (op === "+") st.push(st[st.length - 1] + st[st.length - 2]);
    else if (op === "D") st.push(2 * st[st.length - 1]);
    else if (op === "C") st.pop();
    else st.push(parseInt(op, 10));
  }
  return st.reduce((a, b) => a + b, 0);
}
