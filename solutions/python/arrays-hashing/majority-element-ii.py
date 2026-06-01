# LeetCode 229 — Majority Element II (Medium)
# Category: Arrays & Hashing · Approach: Boyer-Moore
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/majority-element-ii/

def majority_element(nums: list[int]) -> list[int]:
    c1 = c2 = None
    n1 = n2 = 0
    for x in nums:
        if c1 == x:
            n1 += 1
        elif c2 == x:
            n2 += 1
        elif n1 == 0:
            c1, n1 = x, 1
        elif n2 == 0:
            c2, n2 = x, 1
        else:
            n1 -= 1
            n2 -= 1
    res: list[int] = []
    for c in (c1, c2):
        if c is not None and nums.count(c) > len(nums) // 3:
            res.append(c)
    return res
