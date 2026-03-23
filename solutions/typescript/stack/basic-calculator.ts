// LeetCode 224 — Basic Calculator (Hard)
// Category: Stack · Approach: Sign stack
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/basic-calculator/

function calculate(s: string): number {
  let result = 0;
  let sign = 1;
  let num = 0;
  const stack: number[] = [];
  for (const c of s) {
    if (c >= "0" && c <= "9") {
      num = num * 10 + (c.charCodeAt(0) - 48);
    } else if (c === "+") {
      result += sign * num;
      num = 0;
      sign = 1;
    } else if (c === "-") {
      result += sign * num;
      num = 0;
      sign = -1;
    } else if (c === "(") {
      stack.push(result);
      stack.push(sign);
      result = 0;
      sign = 1;
    } else if (c === ")") {
      result += sign * num;
      num = 0;
      result *= stack.pop()!;
      result += stack.pop()!;
    }
  }
  return result + sign * num;
}
