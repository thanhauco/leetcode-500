# LeetCode 347 — Top K Frequent Elements (Medium)
# Category: Arrays & Hashing · Approach: Counter
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/top-k-frequent-elements/

from collections import Counter

def top_k_frequent(nums: list[int], k: int) -> list[int]:
    return [value for value, _ in Counter(nums).most_common(k)]
