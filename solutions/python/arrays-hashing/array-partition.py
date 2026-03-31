# LeetCode 561 — Array Partition (Easy)
# Category: Arrays & Hashing · Approach: Sort + Greedy
# Time: O(n log n) | Space: O(1)
# Source: https://leetcode.com/problems/array-partition/

def array_pair_sum(nums: list[int]) -> int:
    nums.sort()
    return sum(nums[::2])
