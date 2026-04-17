// LeetCode 461 — Hamming Distance (Easy)
// Category: Bit Manipulation · Approach: XOR + Popcount
// Time: O(1) | Space: O(1)
// Source: https://leetcode.com/problems/hamming-distance/

function hammingDistance(x: number, y: number): number {
  let z = x ^ y;
  let count = 0;
  while (z !== 0) {
    z &= z - 1;
    count++;
  }
  return count;
}
