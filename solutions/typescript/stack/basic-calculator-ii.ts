// LeetCode 227 — Basic Calculator II (Medium)
// Category: Stack · Approach: Operator stack
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/basic-calculator-ii/

function calculate(s: string): number {
  const stack: number[] = [];
  let num = 0;
  let op = "+";
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c >= "0" && c <= "9") num = num * 10 + (c.charCodeAt(0) - 48);
    if ((c !== " " && (c < "0" || c > "9")) || i === s.length - 1) {
      if (op === "+") stack.push(num);
      else if (op === "-") stack.push(-num);
      else if (op === "*") stack.push(stack.pop()! * num);
      else stack.push(Math.trunc(stack.pop()! / num));
      op = c;
      num = 0;
    }
  }
  return stack.reduce((a, b) => a + b, 0);
}
