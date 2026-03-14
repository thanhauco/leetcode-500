# LeetCode 75 — Sort Colors (Medium)
# Category: Two Pointers · Approach: Dutch National Flag
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/sort-colors/

def sort_colors(nums: list[int]) -> list[int]:
    low = mid = 0
    high = len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
    return nums
