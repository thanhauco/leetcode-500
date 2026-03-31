# LeetCode 990 — Satisfiability of Equality Equations (Medium)
# Category: Advanced Graphs · Approach: Union-Find
# Time: O(n·α(26)) | Space: O(1)
# Source: https://leetcode.com/problems/satisfiability-of-equality-equations/

def equations_possible(equations: list[str]) -> bool:
    parent = {chr(c): chr(c) for c in range(ord("a"), ord("z") + 1)}

    def find(x: str) -> str:
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    for eq in equations:
        if eq[1] == "=":
            parent[find(eq[0])] = find(eq[3])
    for eq in equations:
        if eq[1] == "!" and find(eq[0]) == find(eq[3]):
            return False
    return True
