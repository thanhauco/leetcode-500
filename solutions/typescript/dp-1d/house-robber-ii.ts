// LeetCode 213 — House Robber II (Medium)
// Category: 1-D Dynamic Programming · Approach: Rolling DP
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/house-robber-ii/

function rob(nums: number[]): number {
  const n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];
  function robLine(lo: number, hi: number): number {
    let prev = 0, cur = 0;
    for (let i = lo; i <= hi; i++) {
      const take = Math.max(cur, prev + nums[i]);
      prev = cur;
      cur = take;
    }
    return cur;
  }
  return Math.max(robLine(0, n - 2), robLine(1, n - 1));
}
