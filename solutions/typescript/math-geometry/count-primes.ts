// LeetCode 204 — Count Primes (Medium)
// Category: Math & Geometry · Approach: Sieve
// Time: O(n log log n) | Space: O(n)
// Source: https://leetcode.com/problems/count-primes/

function countPrimes(n: number): number {
  if (n <= 2) return 0;
  const sieve = new Array<boolean>(n).fill(true);
  sieve[0] = false;
  sieve[1] = false;
  for (let p = 2; p * p < n; p++) {
    if (!sieve[p]) continue;
    for (let multiple = p * p; multiple < n; multiple += p) {
      sieve[multiple] = false;
    }
  }
  let count = 0;
  for (let i = 2; i < n; i++) if (sieve[i]) count++;
  return count;
}
