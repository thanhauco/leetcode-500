# LeetCode 442 — Find All Duplicates in an Array (Medium)
# Category: Arrays & Hashing · Approach: Index Marking
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/find-all-duplicates-in-an-array/

def find_duplicates(nums: list[int]) -> list[int]:
    res = []
    for x in nums:
        idx = abs(x) - 1
        if nums[idx] < 0:
            res.append(idx + 1)
        else:
            nums[idx] = -nums[idx]
    return res
