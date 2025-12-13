// LeetCode 238 — Product of Array Except Self (Medium)
// Category: Arrays & Hashing · Approach: Prefix · Suffix
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/product-of-array-except-self/

function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const answer = new Array<number>(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    answer[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= suffix;
    suffix *= nums[i];
  }
  return answer;
}
