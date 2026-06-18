// LeetCode 646 — Maximum Length of Pair Chain (Medium)
// Category: Intervals · Approach: Greedy by end
// Time: O(n log n) | Space: O(1)
// Source: https://leetcode.com/problems/maximum-length-of-pair-chain/

function findLongestChain(pairs: number[][]): number {
  const sorted = pairs.slice().sort((a, b) => a[1] - b[1]);
  let count = 0;
  let end = -Infinity;
  for (const [a, b] of sorted) {
    if (a > end) {
      count++;
      end = b;
    }
  }
  return count;
}
