# LeetCode 684 — Redundant Connection (Medium)
# Category: Advanced Graphs · Approach: Union-Find
# Time: O(n * α(n)) | Space: O(n)
# Source: https://leetcode.com/problems/redundant-connection/

def find_redundant_connection(edges: list[list[int]]) -> list[int]:
    n = len(edges)
    parent = list(range(n + 1))

    def find(x: int) -> int:
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    for u, v in edges:
        ru, rv = find(u), find(v)
        if ru == rv:
            return [u, v]
        parent[ru] = rv
    return []
