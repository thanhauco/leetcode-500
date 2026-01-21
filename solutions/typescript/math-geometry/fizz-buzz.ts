// LeetCode 412 — Fizz Buzz (Easy)
// Category: Math & Geometry · Approach: Simulation
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/fizz-buzz/

function fizzBuzz(n: number): string[] {
  const result: string[] = [];
  for (let i = 1; i <= n; i++) {
    let label = "";
    if (i % 3 === 0) label += "Fizz";
    if (i % 5 === 0) label += "Buzz";
    result.push(label || String(i));
  }
  return result;
}
