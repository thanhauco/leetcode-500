# LeetCode 1598 — Crawler Log Folder (Easy)
# Category: Stack · Approach: Depth Counter
# Time: O(n) | Space: O(1)
# Source: https://leetcode.com/problems/crawler-log-folder/

def min_operations(logs: list[str]) -> int:
    depth = 0
    for op in logs:
        if op == "../":
            depth = max(0, depth - 1)
        elif op != "./":
            depth += 1
    return depth
