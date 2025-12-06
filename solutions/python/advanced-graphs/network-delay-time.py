# LeetCode 743 — Network Delay Time (Medium)
# Category: Advanced Graphs · Approach: Dijkstra
# Time: O(E log V) | Space: O(V + E)
# Source: https://leetcode.com/problems/network-delay-time/

import heapq

def network_delay_time(times: list[list[int]], n: int, k: int) -> int:
    adj: dict[int, list[tuple[int, int]]] = {i: [] for i in range(1, n + 1)}
    for u, v, w in times:
        adj[u].append((v, w))
    dist: dict[int, int] = {}
    pq = [(0, k)]
    while pq:
        d, u = heapq.heappop(pq)
        if u in dist:
            continue
        dist[u] = d
        for v, w in adj[u]:
            if v not in dist:
                heapq.heappush(pq, (d + w, v))
    return max(dist.values()) if len(dist) == n else -1
