// LeetCode 485 — Max Consecutive Ones (Easy)
// Category: Sliding Window · Approach: Running Streak
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/max-consecutive-ones/

function findMaxConsecutiveOnes(nums: number[]): number {
  let best = 0;
  let current = 0;
  for (const x of nums) {
    current = x === 1 ? current + 1 : 0;
    if (current > best) best = current;
  }
  return best;
}
