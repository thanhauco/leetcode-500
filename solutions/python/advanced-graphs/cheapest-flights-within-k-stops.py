# LeetCode 787 — Cheapest Flights Within K Stops (Medium)
# Category: Advanced Graphs · Approach: Bellman-Ford
# Time: O(k · E) | Space: O(n)
# Source: https://leetcode.com/problems/cheapest-flights-within-k-stops/

def find_cheapest_price(
    n: int, flights: list[list[int]], src: int, dst: int, k: int
) -> int:
    dist = [float("inf")] * n
    dist[src] = 0
    for _ in range(k + 1):
        nxt = dist[:]
        for u, v, w in flights:
            if dist[u] != float("inf") and dist[u] + w < nxt[v]:
                nxt[v] = dist[u] + w
        dist = nxt
    return -1 if dist[dst] == float("inf") else int(dist[dst])
