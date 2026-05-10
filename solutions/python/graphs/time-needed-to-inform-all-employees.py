# LeetCode 1376 — Time Needed to Inform All Employees (Medium)
# Category: Graphs · Approach: DFS
# Time: O(n) | Space: O(n)
# Source: https://leetcode.com/problems/time-needed-to-inform-all-employees/

def num_of_minutes(n: int, head_id: int, manager: list[int], inform_time: list[int]) -> int:
    children: list[list[int]] = [[] for _ in range(n)]
    for i in range(n):
        if manager[i] != -1:
            children[manager[i]].append(i)

    def dfs(u: int) -> int:
        best = 0
        for c in children[u]:
            best = max(best, dfs(c))
        return inform_time[u] + best

    return dfs(head_id)
