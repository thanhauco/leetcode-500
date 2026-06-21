// LeetCode 1281 — Subtract the Product and Sum of Digits of an Integer (Easy)
// Category: Math & Geometry · Approach: Digit walk
// Time: O(log n) | Space: O(1)
// Source: https://leetcode.com/problems/subtract-the-product-and-sum-of-digits-of-an-integer/

function subtractProductAndSum(n: number): number {
  let product = 1, total = 0;
  while (n > 0) {
    const d = n % 10;
    product *= d;
    total += d;
    n = Math.floor(n / 10);
  }
  return product - total;
}
