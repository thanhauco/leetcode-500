// LeetCode 414 — Third Maximum Number (Easy)
// Category: Arrays & Hashing · Approach: Trackers
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/third-maximum-number/

function thirdMax(nums: number[]): number {
  let first: number | null = null, second: number | null = null, third: number | null = null;
  for (const x of nums) {
    if (x === first || x === second || x === third) continue;
    if (first === null || x > first) { third = second; second = first; first = x; }
    else if (second === null || x > second) { third = second; second = x; }
    else if (third === null || x > third) { third = x; }
  }
  return third !== null ? third : (first as number);
}
