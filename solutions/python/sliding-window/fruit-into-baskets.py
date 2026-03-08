# LeetCode 904 — Fruit Into Baskets (Medium)
# Category: Sliding Window · Approach: Sliding Window
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/fruit-into-baskets/

def total_fruit(fruits: list[int]) -> int:
    counts: dict[int, int] = {}
    left = best = 0
    for right, f in enumerate(fruits):
        counts[f] = counts.get(f, 0) + 1
        while len(counts) > 2:
            g = fruits[left]
            counts[g] -= 1
            if counts[g] == 0:
                del counts[g]
            left += 1
        best = max(best, right - left + 1)
    return best
