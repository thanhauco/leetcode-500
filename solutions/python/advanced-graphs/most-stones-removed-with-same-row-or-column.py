# LeetCode 947 — Most Stones Removed with Same Row or Column (Medium)
# Category: Advanced Graphs · Approach: Union-Find
# Time: O(n·α(n)) | Space: O(n)
# Source: https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/

def remove_stones(stones: list[list[int]]) -> int:
    parent: dict[str, str] = {}

    def find(x: str) -> str:
        parent.setdefault(x, x)
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    for r, c in stones:
        parent[find(f"r{r}")] = find(f"c{c}")
    roots = {find(f"r{r}") for r, _ in stones}
    return len(stones) - len(roots)
