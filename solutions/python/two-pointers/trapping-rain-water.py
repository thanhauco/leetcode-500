# LeetCode 42 — Trapping Rain Water (Hard)
# Category: Two Pointers · Approach: Two Pointers
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/trapping-rain-water/

def trap(height: list[int]) -> int:
    l, r = 0, len(height) - 1
    left_max = right_max = res = 0
    while l < r:
        if height[l] < height[r]:
            left_max = max(left_max, height[l])
            res += left_max - height[l]
            l += 1
        else:
            right_max = max(right_max, height[r])
            res += right_max - height[r]
            r -= 1
    return res
