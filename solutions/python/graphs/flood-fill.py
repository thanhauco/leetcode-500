# LeetCode 733 — Flood Fill (Easy)
# Category: Graphs · Approach: DFS
# Time: O(m·n) | Space: O(m·n)
# Source: https://leetcode.com/problems/flood-fill/

def flood_fill(image: list[list[int]], sr: int, sc: int, color: int) -> list[list[int]]:
    start = image[sr][sc]
    if start == color:
        return image
    rows, cols = len(image), len(image[0])

    def dfs(r: int, c: int) -> None:
        if r < 0 or r >= rows or c < 0 or c >= cols or image[r][c] != start:
            return
        image[r][c] = color
        dfs(r + 1, c); dfs(r - 1, c)
        dfs(r, c + 1); dfs(r, c - 1)

    dfs(sr, sc)
    return image
