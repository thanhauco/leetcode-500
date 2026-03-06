# LeetCode 210 — Course Schedule II (Medium)
# Category: Graphs · Approach: Kahn's Algorithm
# Time: O(V + E) | Space: O(V + E)
# Source: https://leetcode.com/problems/course-schedule-ii/

from collections import deque


def find_order(num_courses: int, prerequisites: list[list[int]]) -> list[int]:
    indeg = [0] * num_courses
    adj: list[list[int]] = [[] for _ in range(num_courses)]
    for a, b in prerequisites:
        adj[b].append(a)
        indeg[a] += 1

    queue = deque(i for i in range(num_courses) if indeg[i] == 0)
    order: list[int] = []
    while queue:
        u = queue.popleft()
        order.append(u)
        for v in adj[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                queue.append(v)

    return order if len(order) == num_courses else []
