// LeetCode 989 — Add to Array-Form of Integer (Easy)
// Category: Math & Geometry · Approach: Carry Sweep
// Time: O(max(n, log k)) | Space: O(max(n, log k))
// Source: https://leetcode.com/problems/add-to-array-form-of-integer/

function addToArrayForm(num: number[], k: number): number[] {
  const res: number[] = [];
  let i = num.length - 1;
  let carry = k;
  while (i >= 0 || carry > 0) {
    if (i >= 0) {
      carry += num[i];
      i--;
    }
    res.push(carry % 10);
    carry = Math.floor(carry / 10);
  }
  res.reverse();
  return res;
}
