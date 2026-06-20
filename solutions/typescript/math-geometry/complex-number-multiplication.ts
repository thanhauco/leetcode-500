// LeetCode 537 — Complex Number Multiplication (Medium)
// Category: Math & Geometry · Approach: Parse and multiply
// Time: O(1) | Space: O(1)
// Source: https://leetcode.com/problems/complex-number-multiplication/

function complexNumberMultiply(num1: string, num2: string): string {
  const parse = (s: string): [number, number] => {
    const [a, b] = s.split("+");
    return [parseInt(a, 10), parseInt(b, 10)];
  };
  const [a, b] = parse(num1);
  const [c, d] = parse(num2);
  const real = a * c - b * d;
  const imag = a * d + b * c;
  return `${real}+${imag}i`;
}
