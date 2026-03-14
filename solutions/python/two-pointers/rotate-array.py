# LeetCode 189 — Rotate Array (Medium)
# Category: Two Pointers · Approach: Triple Reverse
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/rotate-array/

def rotate(nums: list[int], k: int) -> list[int]:
    n = len(nums)
    k %= n
    nums.reverse()
    nums[:k] = reversed(nums[:k])
    nums[k:] = reversed(nums[k:])
    return nums
