# LeetCode 179 — Largest Number (Medium)
# Category: Arrays & Hashing · Approach: Custom Sort
# Time: O(n log n · k) | Space: O(n)
# Source: https://leetcode.com/problems/largest-number/

from functools import cmp_to_key


def largest_number(nums: list[int]) -> str:
    strs = [str(x) for x in nums]

    def cmp(a: str, b: str) -> int:
        if a + b > b + a:
            return -1
        if a + b < b + a:
            return 1
        return 0

    strs.sort(key=cmp_to_key(cmp))
    if strs[0] == "0":
        return "0"
    return "".join(strs)
