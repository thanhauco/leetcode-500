# LeetCode 1248 — Count Number of Nice Subarrays (Medium)
# Category: Sliding Window · Approach: Sliding Window
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/count-number-of-nice-subarrays/

def number_of_subarrays(nums: list[int], k: int) -> int:
    def at_most(g: int) -> int:
        if g < 0:
            return 0
        left = 0
        odd = 0
        count = 0
        for right, x in enumerate(nums):
            odd += x % 2
            while odd > g:
                odd -= nums[left] % 2
                left += 1
            count += right - left + 1
        return count

    return at_most(k) - at_most(k - 1)
