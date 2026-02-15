// LeetCode 410 — Split Array Largest Sum (Hard)
// Category: Binary Search · Approach: Binary search on answer
// Time: O(n log(sum)) | Space: O(1)
// Source: https://leetcode.com/problems/split-array-largest-sum/

function splitArray(nums: number[], k: number): number {
  const feasible = (cap: number): boolean => {
    let parts = 1;
    let cur = 0;
    for (const x of nums) {
      if (cur + x > cap) {
        parts++;
        cur = 0;
      }
      cur += x;
    }
    return parts <= k;
  };
  let lo = Math.max(...nums);
  let hi = nums.reduce((a, b) => a + b, 0);
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (feasible(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
