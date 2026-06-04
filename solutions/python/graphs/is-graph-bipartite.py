# LeetCode 785 — Is Graph Bipartite? (Medium)
# Category: Graphs · Approach: BFS coloring
# Time: O(V + E) | Space: O(V)
# Source: https://leetcode.com/problems/is-graph-bipartite/

from collections import deque

def is_bipartite(graph: list[list[int]]) -> bool:
    color = [0] * len(graph)
    for start in range(len(graph)):
        if color[start]:
            continue
        color[start] = 1
        queue = deque([start])
        while queue:
            u = queue.popleft()
            for v in graph[u]:
                if color[v] == 0:
                    color[v] = -color[u]
                    queue.append(v)
                elif color[v] == color[u]:
                    return False
    return True
