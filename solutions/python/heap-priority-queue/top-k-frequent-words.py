# LeetCode 692 — Top K Frequent Words (Medium)
# Category: Heap / Priority Queue · Approach: Sort by key
# Time: O(u log u) | Space: O(u)
# Source: https://leetcode.com/problems/top-k-frequent-words/

from collections import Counter

def top_k_frequent(words: list[str], k: int) -> list[str]:
    counts = Counter(words)
    ordered = sorted(counts, key=lambda w: (-counts[w], w))
    return ordered[:k]
