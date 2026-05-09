# LeetCode 1791 — Find Center of Star Graph (Easy)
# Category: Graphs · Approach: Two-Edge Check
# Time: O(1) | Space: O(1)
# Source: https://leetcode.com/problems/find-center-of-star-graph/

def find_center(edges: list[list[int]]) -> int:
    a, b = edges[0]
    c, d = edges[1]
    return a if a in (c, d) else b
