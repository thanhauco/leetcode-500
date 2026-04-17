// LeetCode 260 — Single Number III (Medium)
// Category: Bit Manipulation · Approach: XOR Partition
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/single-number-iii/

function singleNumber(nums: number[]): number[] {
  let xorAll = 0;
  for (const x of nums) xorAll ^= x;
  const diff = xorAll & -xorAll;
  let a = 0;
  for (const x of nums) {
    if (x & diff) a ^= x;
  }
  return [a, xorAll ^ a];
}
