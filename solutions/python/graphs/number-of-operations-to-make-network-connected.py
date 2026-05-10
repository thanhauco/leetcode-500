# LeetCode 1319 — Number of Operations to Make Network Connected (Medium)
# Category: Graphs · Approach: Union Find
# Time: O(n + e α(n)) | Space: O(n)
# Source: https://leetcode.com/problems/number-of-operations-to-make-network-connected/

def make_connected(n: int, connections: list[list[int]]) -> int:
    if len(connections) < n - 1:
        return -1
    parent = list(range(n))

    def find(x: int) -> int:
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    comp = n
    for a, b in connections:
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[ra] = rb
            comp -= 1
    return comp - 1
