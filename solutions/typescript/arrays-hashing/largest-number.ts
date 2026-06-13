// LeetCode 179 — Largest Number (Medium)
// Category: Arrays & Hashing · Approach: Custom Sort
// Time: O(n log n · k) | Space: O(n)
// Source: https://leetcode.com/problems/largest-number/

function largestNumber(nums: number[]): string {
  const arr = nums.map(String);
  arr.sort((a, b) => {
    const ab = a + b, ba = b + a;
    if (ab === ba) return 0;
    return ab > ba ? -1 : 1;
  });
  if (arr[0] === "0") return "0";
  return arr.join("");
}
