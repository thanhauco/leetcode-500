# LeetCode 31 — Next Permutation (Medium)
# Category: Two Pointers · Approach: Pivot + Reverse
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/next-permutation/

def next_permutation(nums: list[int]) -> list[int]:
    i = len(nums) - 2
    while i >= 0 and nums[i] >= nums[i + 1]:
        i -= 1
    if i >= 0:
        j = len(nums) - 1
        while nums[j] <= nums[i]:
            j -= 1
        nums[i], nums[j] = nums[j], nums[i]
    nums[i + 1:] = reversed(nums[i + 1:])
    return nums
