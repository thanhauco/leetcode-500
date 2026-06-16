// LeetCode 762 — Prime Number of Set Bits in Binary Representation (Easy)
// Category: Bit Manipulation · Approach: Popcount and check
// Time: O((right − left)·log right) | Space: O(1)
// Source: https://leetcode.com/problems/prime-number-of-set-bits-in-binary-representation/

function countPrimeSetBits(left: number, right: number): number {
  const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19]);
  let count = 0;
  for (let x = left; x <= right; x++) {
    let bits = 0, v = x;
    while (v > 0) { bits += v & 1; v >>>= 1; }
    if (primes.has(bits)) count++;
  }
  return count;
}
