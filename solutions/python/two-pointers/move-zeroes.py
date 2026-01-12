# LeetCode 283 — Move Zeroes (Easy)
# Category: Two Pointers · Approach: Two Pointers
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/move-zeroes/

def move_zeroes(nums: list[int]) -> list[int]:
    write = 0
    for x in nums:
        if x != 0:
            nums[write] = x
            write += 1
    for i in range(write, len(nums)):
        nums[i] = 0
    return nums
