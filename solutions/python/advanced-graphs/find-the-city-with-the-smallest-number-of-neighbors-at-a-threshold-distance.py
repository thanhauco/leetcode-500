# LeetCode 1334 — Find the City With the Smallest Number of Neighbors at a Threshold Distance (Medium)
# Category: Advanced Graphs · Approach: Floyd-Warshall
# Time: O(n^3) | Space: O(n^2)
# Source: https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/

def find_the_city(n: int, edges: list[list[int]], distance_threshold: int) -> int:
    INF = float("inf")
    d = [[INF] * n for _ in range(n)]
    for i in range(n):
        d[i][i] = 0
    for u, v, w in edges:
        d[u][v] = min(d[u][v], w)
        d[v][u] = min(d[v][u], w)
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if d[i][k] + d[k][j] < d[i][j]:
                    d[i][j] = d[i][k] + d[k][j]
    ans_city, ans_count = -1, INF
    for i in range(n):
        cnt = sum(1 for j in range(n) if j != i and d[i][j] <= distance_threshold)
        if cnt <= ans_count:
            ans_count, ans_city = cnt, i
    return ans_city
