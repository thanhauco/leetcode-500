# LeetCode 202 — Happy Number (Easy)
# Category: Math & Geometry · Approach: Cycle Detection
# Time: O(log n) | Space: O(log n)
# Source: https://leetcode.com/problems/happy-number/

def is_happy(n: int) -> bool:
    seen = set()
    while n != 1 and n not in seen:
        seen.add(n)
        n = sum(int(d) ** 2 for d in str(n))
    return n == 1
