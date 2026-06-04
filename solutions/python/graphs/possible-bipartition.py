# LeetCode 886 — Possible Bipartition (Medium)
# Category: Graphs · Approach: BFS coloring
# Time: O(n + E) | Space: O(n + E)
# Source: https://leetcode.com/problems/possible-bipartition/

from collections import deque

def possible_bipartition(n: int, dislikes: list[list[int]]) -> bool:
    adj = [[] for _ in range(n + 1)]
    for a, b in dislikes:
        adj[a].append(b)
        adj[b].append(a)
    color = [0] * (n + 1)
    for s in range(1, n + 1):
        if color[s]:
            continue
        color[s] = 1
        queue = deque([s])
        while queue:
            u = queue.popleft()
            for v in adj[u]:
                if color[v] == 0:
                    color[v] = -color[u]
                    queue.append(v)
                elif color[v] == color[u]:
                    return False
    return True
