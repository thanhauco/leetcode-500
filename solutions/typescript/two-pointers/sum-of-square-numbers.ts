// LeetCode 633 — Sum of Square Numbers (Medium)
// Category: Two Pointers · Approach: Two Pointers
// Time: O(√c) | Space: O(1)
// Source: https://leetcode.com/problems/sum-of-square-numbers/

function judgeSquareSum(c: number): boolean {
  let left = 0;
  let right = Math.floor(Math.sqrt(c));
  while (left <= right) {
    const s = left * left + right * right;
    if (s === c) return true;
    if (s < c) left++;
    else right--;
  }
  return false;
}
