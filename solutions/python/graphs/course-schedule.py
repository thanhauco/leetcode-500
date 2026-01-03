# LeetCode 207 — Course Schedule (Medium)
# Category: Graphs · Approach: Kahn Topological Sort
# Time: O(V + E) | Space: O(V + E)
# Source: https://leetcode.com/problems/course-schedule/

from collections import deque


def can_finish(num_courses: int, prerequisites: list[list[int]]) -> bool:
    indeg = [0] * num_courses
    adj: list[list[int]] = [[] for _ in range(num_courses)]
    for a, b in prerequisites:
        adj[b].append(a)
        indeg[a] += 1
    queue = deque(i for i in range(num_courses) if indeg[i] == 0)
    seen = 0
    while queue:
        node = queue.popleft()
        seen += 1
        for nxt in adj[node]:
            indeg[nxt] -= 1
            if indeg[nxt] == 0:
                queue.append(nxt)
    return seen == num_courses
