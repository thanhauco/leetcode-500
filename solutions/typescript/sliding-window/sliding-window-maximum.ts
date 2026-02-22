// LeetCode 239 — Sliding Window Maximum (Hard)
// Category: Sliding Window · Approach: Monotonic Deque
// Time: O(n) | Space: O(k)
// Source: https://leetcode.com/problems/sliding-window-maximum/

function maxSlidingWindow(nums: number[], k: number): number[] {
  const res: number[] = [];
  const dq: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    while (dq.length && dq[0] <= i - k) dq.shift();
    while (dq.length && nums[dq[dq.length - 1]] <= nums[i]) dq.pop();
    dq.push(i);
    if (i >= k - 1) res.push(nums[dq[0]]);
  }
  return res;
}
