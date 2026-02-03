# LeetCode 1466 — Reorder Routes to Make All Paths Lead to the City Zero (Medium)
# Category: Graphs · Approach: DFS from 0
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/

def min_reorder(n: int, connections: list[list[int]]) -> int:
    adj: list[list[tuple[int, int]]] = [[] for _ in range(n)]
    for a, b in connections:
        adj[a].append((b, 1))
        adj[b].append((a, 0))

    visited = [False] * n
    flips = 0

    def dfs(city: int) -> None:
        nonlocal flips
        visited[city] = True
        for nei, cost in adj[city]:
            if not visited[nei]:
                flips += cost
                dfs(nei)

    dfs(0)
    return flips
