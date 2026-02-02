# LeetCode 547 — Number of Provinces (Medium)
# Category: Graphs · Approach: DFS components
# Time: O(n²) | Space: O(n)
# Source: https://leetcode.com/problems/number-of-provinces/

def find_circle_num(is_connected: list[list[int]]) -> int:
    n = len(is_connected)
    visited = [False] * n

    def dfs(city: int) -> None:
        for other in range(n):
            if is_connected[city][other] == 1 and not visited[other]:
                visited[other] = True
                dfs(other)

    provinces = 0
    for city in range(n):
        if not visited[city]:
            visited[city] = True
            dfs(city)
            provinces += 1
    return provinces
