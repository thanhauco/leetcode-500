// LeetCode 202 — Happy Number (Easy)
// Category: Math & Geometry · Approach: Cycle Detection
// Time: O(log n) | Space: O(log n)
// Source: https://leetcode.com/problems/happy-number/

function isHappy(n: number): boolean {
  const seen = new Set<number>();
  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    let sum = 0;
    while (n > 0) {
      const d = n % 10;
      sum += d * d;
      n = Math.floor(n / 10);
    }
    n = sum;
  }
  return n === 1;
}
