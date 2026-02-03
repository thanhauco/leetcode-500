# LeetCode 763 — Partition Labels (Medium)
# Category: Greedy · Approach: Greedy
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/partition-labels/

def partition_labels(s: str) -> list[int]:
    last = {ch: i for i, ch in enumerate(s)}
    res: list[int] = []
    start = end = 0
    for i, ch in enumerate(s):
        end = max(end, last[ch])
        if i == end:
            res.append(end - start + 1)
            start = i + 1
    return res
