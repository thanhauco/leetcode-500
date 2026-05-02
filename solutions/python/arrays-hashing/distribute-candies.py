# LeetCode 575 — Distribute Candies (Easy)
# Category: Arrays & Hashing · Approach: Hash Set
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/distribute-candies/

def distribute_candies(candy_type: list[int]) -> int:
    return min(len(set(candy_type)), len(candy_type) // 2)
