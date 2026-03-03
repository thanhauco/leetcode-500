# LeetCode 51 — N-Queens (Hard)
# Category: Backtracking · Approach: Backtracking
# Time: O(n!) | Space: O(n^2)
# Source: https://leetcode.com/problems/n-queens/

def solve_n_queens(n: int) -> list[list[str]]:
    res: list[list[str]] = []
    cols: set[int] = set()
    diag: set[int] = set()   # row - col
    anti: set[int] = set()   # row + col
    board = [["."] * n for _ in range(n)]

    def place(r: int) -> None:
        if r == n:
            res.append(["".join(row) for row in board])
            return
        for c in range(n):
            if c in cols or (r - c) in diag or (r + c) in anti:
                continue
            cols.add(c); diag.add(r - c); anti.add(r + c)
            board[r][c] = "Q"
            place(r + 1)
            board[r][c] = "."
            cols.discard(c); diag.discard(r - c); anti.discard(r + c)

    place(0)
    return res
