# LeetCode 771 — Jewels and Stones (Easy)
# Category: Arrays & Hashing · Approach: Hash Set
# Time: O(j + s) | Space: O(j)
# Source: https://leetcode.com/problems/jewels-and-stones/

def num_jewels_in_stones(jewels: str, stones: str) -> int:
    jewel_set = set(jewels)
    return sum(1 for s in stones if s in jewel_set)
