# LeetCode 1557 — Minimum Number of Vertices to Reach All Nodes (Medium)
# Category: Graphs · Approach: In-degree
# Time: O(n + e) | Space: O(n)
# Source: https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/

def find_smallest_set_of_vertices(n: int, edges: list[list[int]]) -> list[int]:
    indeg = [0] * n
    for _, v in edges:
        indeg[v] += 1
    return [i for i in range(n) if indeg[i] == 0]
