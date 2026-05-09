# LeetCode 1615 — Maximal Network Rank (Medium)
# Category: Graphs · Approach: Degree + Adjacency
# Time: O(n^2 + e) | Space: O(n^2)
# Source: https://leetcode.com/problems/maximal-network-rank/

def maximal_network_rank(n: int, roads: list[list[int]]) -> int:
    deg = [0] * n
    connected = [[False] * n for _ in range(n)]
    for a, b in roads:
        deg[a] += 1
        deg[b] += 1
        connected[a][b] = connected[b][a] = True
    ans = 0
    for i in range(n):
        for j in range(i + 1, n):
            rank = deg[i] + deg[j] - (1 if connected[i][j] else 0)
            ans = max(ans, rank)
    return ans
