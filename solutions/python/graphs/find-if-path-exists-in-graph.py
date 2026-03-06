# LeetCode 1971 — Find if Path Exists in Graph (Easy)
# Category: Graphs · Approach: Union-Find
# Time: O((V + E) * α(V)) | Space: O(V)
# Source: https://leetcode.com/problems/find-if-path-exists-in-graph/

def valid_path(n: int, edges: list[list[int]], source: int, destination: int) -> bool:
    parent = list(range(n))

    def find(x: int) -> int:
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    for a, b in edges:
        parent[find(a)] = find(b)

    return find(source) == find(destination)
