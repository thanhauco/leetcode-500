# LeetCode 621 — Task Scheduler (Medium)
# Category: Heap / Priority Queue · Approach: Greedy formula
# Time: O(t) | Space: O(1)
# Source: https://leetcode.com/problems/task-scheduler/

from collections import Counter

def least_interval(tasks: list[str], n: int) -> int:
    counts = Counter(tasks)
    max_freq = max(counts.values())
    ties = sum(1 for v in counts.values() if v == max_freq)
    frame = (max_freq - 1) * (n + 1) + ties
    return max(frame, len(tasks))
