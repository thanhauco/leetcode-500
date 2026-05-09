# LeetCode 2316 — Count Unreachable Pairs of Nodes in an Undirected Graph (Medium)
# Category: Graphs · Approach: Union Find
# Time: O(n + e α(n)) | Space: O(n)
# Source: https://leetcode.com/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph/

def count_pairs(n: int, edges: list[list[int]]) -> int:
    parent = list(range(n))
    size = [1] * n

    def find(x: int) -> int:
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    for a, b in edges:
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[ra] = rb
            size[rb] += size[ra]

    total = 0
    for i in range(n):
        if find(i) == i:
            total += size[i] * (n - size[i])
    return total // 2
