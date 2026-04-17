// LeetCode 421 — Maximum XOR of Two Numbers in an Array (Medium)
// Category: Bit Manipulation · Approach: Greedy prefix set
// Time: O(32n) | Space: O(n)
// Source: https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/

function findMaximumXOR(nums: number[]): number {
  let maxXor = 0;
  let mask = 0;
  for (let bit = 30; bit >= 0; bit--) {
    mask |= (1 << bit);
    const prefixes = new Set<number>();
    for (const n of nums) prefixes.add(n & mask);
    const candidate = maxXor | (1 << bit);
    for (const p of prefixes) {
      if (prefixes.has(candidate ^ p)) {
        maxXor = candidate;
        break;
      }
    }
  }
  return maxXor;
}
