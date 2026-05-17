// LeetCode 645 — Set Mismatch (Easy)
// Category: Arrays & Hashing · Approach: Counting
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/set-mismatch/

function findErrorNums(nums: number[]): number[] {
  const n = nums.length;
  const counts = new Array<number>(n + 1).fill(0);
  for (const x of nums) counts[x]++;
  let dup = -1, miss = -1;
  for (let v = 1; v <= n; v++) {
    if (counts[v] === 2) dup = v;
    else if (counts[v] === 0) miss = v;
  }
  return [dup, miss];
}
