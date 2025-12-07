# LeetCode 238 — Product of Array Except Self (Medium)
# Category: Arrays & Hashing · Approach: Prefix · Suffix
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/product-of-array-except-self/

def product_except_self(nums: list[int]) -> list[int]:
    n = len(nums)
    answer = [1] * n
    prefix = 1
    for i in range(n):
        answer[i] = prefix
        prefix *= nums[i]
    suffix = 1
    for i in range(n - 1, -1, -1):
        answer[i] *= suffix
        suffix *= nums[i]
    return answer
