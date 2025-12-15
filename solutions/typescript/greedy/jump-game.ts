// LeetCode 55 — Jump Game (Medium)
// Category: Greedy · Approach: Greedy
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/jump-game/

function canJump(nums: number[]): boolean {
  let reach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > reach) return false;
    reach = Math.max(reach, i + nums[i]);
  }
  return true;
}
