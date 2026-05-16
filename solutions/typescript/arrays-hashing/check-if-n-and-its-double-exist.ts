// LeetCode 1346 — Check If N and Its Double Exist (Easy)
// Category: Arrays & Hashing · Approach: Hash Set
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/check-if-n-and-its-double-exist/

function checkIfExist(arr: number[]): boolean {
  const seen = new Set<number>();
  for (const x of arr) {
    if (seen.has(2 * x) || (x % 2 === 0 && seen.has(x / 2))) return true;
    seen.add(x);
  }
  return false;
}
