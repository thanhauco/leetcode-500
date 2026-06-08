# LeetCode 930 — Binary Subarrays With Sum (Medium)
# Category: Sliding Window · Approach: Sliding Window
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/binary-subarrays-with-sum/

def num_subarrays_with_sum(nums: list[int], goal: int) -> int:
    def at_most(g: int) -> int:
        if g < 0:
            return 0
        left = 0
        total = 0
        count = 0
        for right, x in enumerate(nums):
            total += x
            while total > g:
                total -= nums[left]
                left += 1
            count += right - left + 1
        return count

    return at_most(goal) - at_most(goal - 1)
