# LeetCode 130 — Surrounded Regions (Medium)
# Category: Graphs · Approach: Border DFS
# Time: O(m·n) | Space: O(m·n)
# Source: https://leetcode.com/problems/surrounded-regions/

def solve(board: list[list[str]]) -> list[list[str]]:
    if not board:
        return board
    rows, cols = len(board), len(board[0])

    def mark(r: int, c: int) -> None:
        if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != "O":
            return
        board[r][c] = "S"
        mark(r + 1, c); mark(r - 1, c); mark(r, c + 1); mark(r, c - 1)

    for r in range(rows):
        mark(r, 0); mark(r, cols - 1)
    for c in range(cols):
        mark(0, c); mark(rows - 1, c)

    for r in range(rows):
        for c in range(cols):
            board[r][c] = "O" if board[r][c] == "S" else "X"
    return board
