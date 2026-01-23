// LeetCode 150 — Evaluate Reverse Polish Notation (Medium)
// Category: Stack · Approach: Stack
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/evaluate-reverse-polish-notation/

function evalRPN(tokens: string[]): number {
  const st: number[] = [];
  const ops = new Set(["+", "-", "*", "/"]);
  for (const t of tokens) {
    if (ops.has(t)) {
      const b = st.pop()!;
      const a = st.pop()!;
      if (t === "+") st.push(a + b);
      else if (t === "-") st.push(a - b);
      else if (t === "*") st.push(a * b);
      else st.push(Math.trunc(a / b));
    } else {
      st.push(parseInt(t, 10));
    }
  }
  return st.pop()!;
}
