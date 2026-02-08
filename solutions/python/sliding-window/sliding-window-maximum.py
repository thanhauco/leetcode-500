# LeetCode 239 — Sliding Window Maximum (Hard)
# Category: Sliding Window · Approach: Monotonic Deque
# Time: O(n) | Space: O(k)
# Source: https://leetcode.com/problems/sliding-window-maximum/

from collections import deque


def max_sliding_window(nums: list[int], k: int) -> list[int]:
    dq = deque()
    res = []
    for i, x in enumerate(nums):
        while dq and dq[0] <= i - k:
            dq.popleft()
        while dq and nums[dq[-1]] <= x:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            res.append(nums[dq[0]])
    return res
