// LeetCode 673 — Number of Longest Increasing Subsequence (Medium)
// Category: 1-D Dynamic Programming · Approach: Length + Count DP
// Time: O(n^2) | Space: O(n)
// Source: https://leetcode.com/problems/number-of-longest-increasing-subsequence/

function findNumberOfLIS(nums: number[]): number {
  const n = nums.length;
  if (n === 0) return 0;
  const length = new Array<number>(n).fill(1);
  const count = new Array<number>(n).fill(1);
  let maxLen = 1;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        if (length[j] + 1 > length[i]) {
          length[i] = length[j] + 1;
          count[i] = count[j];
        } else if (length[j] + 1 === length[i]) {
          count[i] += count[j];
        }
      }
    }
    maxLen = Math.max(maxLen, length[i]);
  }
  let total = 0;
  for (let i = 0; i < n; i++) if (length[i] === maxLen) total += count[i];
  return total;
}
