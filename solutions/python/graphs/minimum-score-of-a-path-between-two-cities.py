# LeetCode 2492 — Minimum Score of a Path Between Two Cities (Medium)
# Category: Graphs · Approach: BFS
# Time: O(n + e) | Space: O(n + e)
# Source: https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities/

def min_score(n: int, roads: list[list[int]]) -> int:
    adj: list[list[tuple[int, int]]] = [[] for _ in range(n + 1)]
    for a, b, d in roads:
        adj[a].append((b, d))
        adj[b].append((a, d))
    seen = [False] * (n + 1)
    seen[1] = True
    stack = [1]
    best = float("inf")
    while stack:
        u = stack.pop()
        for v, d in adj[u]:
            best = min(best, d)
            if not seen[v]:
                seen[v] = True
                stack.append(v)
    return best
