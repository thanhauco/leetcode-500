# LeetCode 1584 — Min Cost to Connect All Points (Medium)
# Category: Advanced Graphs · Approach: Prim's MST
# Time: O(n^2) | Space: O(n)
# Source: https://leetcode.com/problems/min-cost-to-connect-all-points/

def min_cost_connect_points(points: list[list[int]]) -> int:
    n = len(points)
    if n <= 1:
        return 0
    in_mst = [False] * n
    dist = [float("inf")] * n
    dist[0] = 0
    total = 0
    for _ in range(n):
        u = -1
        for i in range(n):
            if not in_mst[i] and (u == -1 or dist[i] < dist[u]):
                u = i
        in_mst[u] = True
        total += dist[u]
        for v in range(n):
            if not in_mst[v]:
                d = abs(points[u][0] - points[v][0]) + abs(points[u][1] - points[v][1])
                if d < dist[v]:
                    dist[v] = d
    return int(total)
