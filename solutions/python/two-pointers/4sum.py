# LeetCode 18 — 4Sum (Medium)
# Category: Two Pointers · Approach: Sort + Two Pointers
# Time: O(n^3) | Space: O(1)
# Source: https://leetcode.com/problems/4sum/

def four_sum(nums: list[int], target: int) -> list[list[int]]:
    nums.sort()
    n = len(nums)
    res: list[list[int]] = []
    for i in range(n - 3):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        for j in range(i + 1, n - 2):
            if j > i + 1 and nums[j] == nums[j - 1]:
                continue
            l, r = j + 1, n - 1
            while l < r:
                total = nums[i] + nums[j] + nums[l] + nums[r]
                if total == target:
                    res.append([nums[i], nums[j], nums[l], nums[r]])
                    while l < r and nums[l] == nums[l + 1]:
                        l += 1
                    while l < r and nums[r] == nums[r - 1]:
                        r -= 1
                    l += 1
                    r -= 1
                elif total < target:
                    l += 1
                else:
                    r -= 1
    return res
