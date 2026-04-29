// LeetCode 922 — Sort Array By Parity II (Medium)
// Category: Two Pointers · Approach: Two Cursors
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/sort-array-by-parity-ii/

function sortArrayByParityII(nums: number[]): number[] {
  const res = new Array<number>(nums.length);
  let even = 0;
  let odd = 1;
  for (const x of nums) {
    if (x % 2 === 0) {
      res[even] = x;
      even += 2;
    } else {
      res[odd] = x;
      odd += 2;
    }
  }
  return res;
}
