# LeetCode 165 — Compare Version Numbers (Medium)
# Category: Two Pointers · Approach: Split & Compare
# Time: O(n + m) | Space: O(n + m)
# Source: https://leetcode.com/problems/compare-version-numbers/

def compare_version(version1: str, version2: str) -> int:
    a = version1.split(".")
    b = version2.split(".")
    for i in range(max(len(a), len(b))):
        x = int(a[i]) if i < len(a) else 0
        y = int(b[i]) if i < len(b) else 0
        if x < y:
            return -1
        if x > y:
            return 1
    return 0
