# LeetCode 1129 — Shortest Path with Alternating Colors (Medium)
# Category: Advanced Graphs · Approach: State BFS
# Time: O(n + e) | Space: O(n + e)
# Source: https://leetcode.com/problems/shortest-path-with-alternating-colors/

from collections import deque


def shortest_alternating_paths(n: int, red_edges: list[list[int]], blue_edges: list[list[int]]) -> list[int]:
    adj = [[[], []] for _ in range(n)]  # adj[u][0]=red, adj[u][1]=blue
    for u, v in red_edges:
        adj[u][0].append(v)
    for u, v in blue_edges:
        adj[u][1].append(v)
    INF = float("inf")
    dist = [[INF, INF] for _ in range(n)]
    dist[0] = [0, 0]
    q = deque([(0, 0), (0, 1)])
    while q:
        node, last = q.popleft()
        nxt_color = last ^ 1
        for nb in adj[node][nxt_color]:
            if dist[nb][nxt_color] == INF:
                dist[nb][nxt_color] = dist[node][last] + 1
                q.append((nb, nxt_color))
    return [-1 if min(a, b) == INF else min(a, b) for a, b in dist]
