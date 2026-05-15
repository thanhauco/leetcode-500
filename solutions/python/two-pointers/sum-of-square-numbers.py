# LeetCode 633 — Sum of Square Numbers (Medium)
# Category: Two Pointers · Approach: Two Pointers
# Time: O(√c) | Space: O(1)
# Source: https://leetcode.com/problems/sum-of-square-numbers/

import math

def judge_square_sum(c: int) -> bool:
    left, right = 0, int(math.isqrt(c))
    while left <= right:
        s = left * left + right * right
        if s == c:
            return True
        if s < c:
            left += 1
        else:
            right -= 1
    return False
