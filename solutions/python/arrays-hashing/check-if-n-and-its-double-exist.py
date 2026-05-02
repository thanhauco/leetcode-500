# LeetCode 1346 — Check If N and Its Double Exist (Easy)
# Category: Arrays & Hashing · Approach: Hash Set
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/check-if-n-and-its-double-exist/

def check_if_exist(arr: list[int]) -> bool:
    seen: set[int] = set()
    for x in arr:
        if 2 * x in seen or (x % 2 == 0 and x // 2 in seen):
            return True
        seen.add(x)
    return False
