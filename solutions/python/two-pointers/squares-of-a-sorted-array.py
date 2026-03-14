# LeetCode 977 — Squares of a Sorted Array (Easy)
# Category: Two Pointers · Approach: Two Pointers
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/squares-of-a-sorted-array/

def sorted_squares(nums: list[int]) -> list[int]:
    n = len(nums)
    res = [0] * n
    l, r = 0, n - 1
    for i in range(n - 1, -1, -1):
        if abs(nums[l]) > abs(nums[r]):
            res[i] = nums[l] * nums[l]
            l += 1
        else:
            res[i] = nums[r] * nums[r]
            r -= 1
    return res
