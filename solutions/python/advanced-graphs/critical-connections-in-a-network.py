# LeetCode 1192 — Critical Connections in a Network (Hard)
# Category: Advanced Graphs · Approach: Tarjan Bridges
# Time: O(n + e) | Space: O(n + e)
# Source: https://leetcode.com/problems/critical-connections-in-a-network/

import sys


def critical_connections(n: int, connections: list[list[int]]) -> list[list[int]]:
    sys.setrecursionlimit(300000)
    graph: list[list[int]] = [[] for _ in range(n)]
    for a, b in connections:
        graph[a].append(b)
        graph[b].append(a)
    disc = [-1] * n
    low = [0] * n
    bridges: list[list[int]] = []
    timer = 0

    def dfs(u: int, parent: int) -> None:
        nonlocal timer
        disc[u] = low[u] = timer
        timer += 1
        for v in graph[u]:
            if v == parent:
                continue
            if disc[v] == -1:
                dfs(v, u)
                low[u] = min(low[u], low[v])
                if low[v] > disc[u]:
                    bridges.append([min(u, v), max(u, v)])
            else:
                low[u] = min(low[u], disc[v])

    for i in range(n):
        if disc[i] == -1:
            dfs(i, -1)
    return bridges
