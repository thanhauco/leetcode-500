// LeetCode 868 — Binary Gap (Easy)
// Category: Bit Manipulation · Approach: Track last one
// Time: O(log n) | Space: O(1)
// Source: https://leetcode.com/problems/binary-gap/

function binaryGap(n: number): number {
  let last = -1, i = 0, best = 0;
  while (n > 0) {
    if (n & 1) {
      if (last >= 0) best = Math.max(best, i - last);
      last = i;
    }
    n = n >>> 1;
    i++;
  }
  return best;
}
