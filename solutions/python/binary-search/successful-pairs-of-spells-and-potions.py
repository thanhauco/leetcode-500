# LeetCode 2300 — Successful Pairs of Spells and Potions (Medium)
# Category: Binary Search · Approach: Sort + binary search
# Time: O((n + m) log m) | Space: O(m)
# Source: https://leetcode.com/problems/successful-pairs-of-spells-and-potions/

def successful_pairs(spells: list[int], potions: list[int], success: int) -> list[int]:
    potions = sorted(potions)
    m = len(potions)
    res: list[int] = []
    for sp in spells:
        lo, hi = 0, m
        while lo < hi:
            mid = (lo + hi) // 2
            if sp * potions[mid] >= success:
                hi = mid
            else:
                lo = mid + 1
        res.append(m - lo)
    return res
