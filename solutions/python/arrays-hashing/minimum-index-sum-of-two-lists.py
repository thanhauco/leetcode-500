# LeetCode 599 — Minimum Index Sum of Two Lists (Medium)
# Category: Arrays & Hashing · Approach: Hash Map
# Time: O(n + m) | Space: O(n)
# Source: https://leetcode.com/problems/minimum-index-sum-of-two-lists/

def find_restaurant(list1: list[str], list2: list[str]) -> list[str]:
    index = {w: i for i, w in enumerate(list1)}
    best = float("inf")
    result: list[str] = []
    for j, w in enumerate(list2):
        if w in index:
            s = index[w] + j
            if s < best:
                best, result = s, [w]
            elif s == best:
                result.append(w)
    return result
