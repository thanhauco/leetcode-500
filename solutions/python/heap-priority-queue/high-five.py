# LeetCode 1086 — High Five (Easy)
# Category: Heap / Priority Queue · Approach: Group + top 5
# Time: O(n log n) | Space: O(n)
# Source: https://leetcode.com/problems/high-five/

from collections import defaultdict

def high_five(items: list[list[int]]) -> list[list[int]]:
    scores = defaultdict(list)
    for sid, score in items:
        scores[sid].append(score)
    result = []
    for sid in sorted(scores):
        top = sorted(scores[sid], reverse=True)[:5]
        result.append([sid, sum(top) // len(top)])
    return result
