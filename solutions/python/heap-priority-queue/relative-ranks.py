# LeetCode 506 — Relative Ranks (Easy)
# Category: Heap / Priority Queue · Approach: Indirect sort
# Time: O(n log n) | Space: O(n)
# Source: https://leetcode.com/problems/relative-ranks/

def find_relative_ranks(score: list[int]) -> list[str]:
    order = sorted(range(len(score)), key=lambda i: -score[i])
    medals = ["Gold Medal", "Silver Medal", "Bronze Medal"]
    res = [""] * len(score)
    for rank, i in enumerate(order):
        res[i] = medals[rank] if rank < 3 else str(rank + 1)
    return res
