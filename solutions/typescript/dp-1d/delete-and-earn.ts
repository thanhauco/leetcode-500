// LeetCode 740 — Delete and Earn (Medium)
// Category: 1-D Dynamic Programming · Approach: House Robber DP
// Time: O(n + max) | Space: O(max)
// Source: https://leetcode.com/problems/delete-and-earn/

function deleteAndEarn(nums: number[]): number {
  const maxVal = Math.max(...nums);
  const points = new Array<number>(maxVal + 1).fill(0);
  for (const x of nums) points[x] += x;

  let prev = 0;
  let curr = 0;
  for (let v = 1; v <= maxVal; v++) {
    const take = prev + points[v];
    const skip = curr;
    prev = curr;
    curr = Math.max(take, skip);
  }
  return curr;
}
