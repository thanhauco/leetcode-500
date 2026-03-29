// LeetCode 905 — Sort Array By Parity (Easy)
// Category: Two Pointers · Approach: Two Pointers
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/sort-array-by-parity/

function sortArrayByParity(nums: number[]): number[] {
  const res = nums.slice();
  let l = 0;
  let r = res.length - 1;
  while (l < r) {
    if (res[l] % 2 === 0) l++;
    else if (res[r] % 2 === 1) r--;
    else {
      [res[l], res[r]] = [res[r], res[l]];
      l++;
      r--;
    }
  }
  return res;
}
