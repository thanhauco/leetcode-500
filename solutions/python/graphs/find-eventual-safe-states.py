# LeetCode 802 — Find Eventual Safe States (Medium)
# Category: Graphs · Approach: DFS Coloring
# Time: O(V + E) | Space: O(V + E)
# Source: https://leetcode.com/problems/find-eventual-safe-states/

def eventual_safe_nodes(graph: list[list[int]]) -> list[int]:
    n = len(graph)
    color = [0] * n  # 0 unvisited, 1 visiting, 2 safe

    def safe(u: int) -> bool:
        if color[u] != 0:
            return color[u] == 2
        color[u] = 1
        for v in graph[u]:
            if not safe(v):
                return False
        color[u] = 2
        return True

    return [i for i in range(n) if safe(i)]
