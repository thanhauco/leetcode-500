# LeetCode 797 — All Paths From Source to Target (Medium)
# Category: Graphs · Approach: DFS Backtracking
# Time: O(2^n * n) | Space: O(n)
# Source: https://leetcode.com/problems/all-paths-from-source-to-target/

def all_paths_source_target(graph: list[list[int]]) -> list[list[int]]:
    target = len(graph) - 1
    res: list[list[int]] = []

    def dfs(node: int, path: list[int]) -> None:
        if node == target:
            res.append(path[:])
            return
        for nxt in graph[node]:
            path.append(nxt)
            dfs(nxt, path)
            path.pop()

    dfs(0, [0])
    return res
