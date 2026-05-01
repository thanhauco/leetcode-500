# LeetCode 1514 — Path with Maximum Probability (Medium)
# Category: Advanced Graphs · Approach: Dijkstra (max-heap)
# Time: O((n + e) log n) | Space: O(n + e)
# Source: https://leetcode.com/problems/path-with-maximum-probability/

import heapq


def max_probability(n: int, edges: list[list[int]], succ_prob: list[float], start: int, end: int) -> float:
    adj: list[list[tuple[int, float]]] = [[] for _ in range(n)]
    for i, (u, v) in enumerate(edges):
        adj[u].append((v, succ_prob[i]))
        adj[v].append((u, succ_prob[i]))
    best = [0.0] * n
    best[start] = 1.0
    heap = [(-1.0, start)]
    while heap:
        neg_p, node = heapq.heappop(heap)
        p = -neg_p
        if node == end:
            return p
        if p < best[node]:
            continue
        for nb, ep in adj[node]:
            np = p * ep
            if np > best[nb]:
                best[nb] = np
                heapq.heappush(heap, (-np, nb))
    return 0.0
