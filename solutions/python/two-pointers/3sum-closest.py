# LeetCode 16 — 3Sum Closest (Medium)
# Category: Two Pointers · Approach: Sort + Two Pointers
# Time: O(n^2) | Space: O(1)
# Source: https://leetcode.com/problems/3sum-closest/

def three_sum_closest(nums: list[int], target: int) -> int:
    nums.sort()
    best = nums[0] + nums[1] + nums[2]
    for i in range(len(nums) - 2):
        l, r = i + 1, len(nums) - 1
        while l < r:
            total = nums[i] + nums[l] + nums[r]
            if abs(total - target) < abs(best - target):
                best = total
            if total == target:
                return total
            if total < target:
                l += 1
            else:
                r -= 1
    return best
