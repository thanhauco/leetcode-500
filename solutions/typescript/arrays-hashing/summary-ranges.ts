// LeetCode 228 — Summary Ranges (Easy)
// Category: Arrays & Hashing · Approach: Linear Scan
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/summary-ranges/

function summaryRanges(nums: number[]): string[] {
  const res: string[] = [];
  let i = 0;
  const n = nums.length;
  while (i < n) {
    let j = i;
    while (j + 1 < n && nums[j + 1] === nums[j] + 1) j++;
    res.push(i === j ? String(nums[i]) : nums[i] + "->" + nums[j]);
    i = j + 1;
  }
  return res;
}
