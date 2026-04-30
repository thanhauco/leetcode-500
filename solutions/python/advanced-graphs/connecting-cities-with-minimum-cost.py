# LeetCode 1135 — Connecting Cities With Minimum Cost (Medium)
# Category: Advanced Graphs · Approach: Kruskal MST
# Time: O(e log e) | Space: O(n)
# Source: https://leetcode.com/problems/connecting-cities-with-minimum-cost/

def minimum_cost(n: int, connections: list[list[int]]) -> int:
    parent = list(range(n + 1))

    def find(x: int) -> int:
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    total = used = 0
    for a, b, c in sorted(connections, key=lambda e: e[2]):
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[ra] = rb
            total += c
            used += 1
    return total if used == n - 1 else -1
