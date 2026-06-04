# LeetCode 323 — Number of Connected Components in an Undirected Graph (Medium)
# Category: Graphs · Approach: Union-Find
# Time: O(n + E · α(n)) | Space: O(n)
# Source: https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/

def count_components(n: int, edges: list[list[int]]) -> int:
    parent = list(range(n))

    def find(x: int) -> int:
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    count = n
    for a, b in edges:
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[ra] = rb
            count -= 1
    return count
